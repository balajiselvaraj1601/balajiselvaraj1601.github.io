#!/usr/bin/env python3
"""Aggressive cleanup of redundant and unnecessary repo files."""

from __future__ import annotations

import shutil
import subprocess
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REPORT = ROOT / "tmp" / "cleanup-report.md"

LOCAL_ONLY_DIRS = [
    "tmp",
    "dist",
    ".dist-baseline",
    ".venv-codespell",
    "scripts/icons/.icon-stage",
    "scripts/icons/__pycache__",
    "tests/__pycache__",
    ".cursor/logs",
    "src/assets/icons/_work",
    "assets/source",
    "docs/content-audit",
    "docs/reference/screenshots/review",
    "content/drafts",
]

ICON_PNG_DIRS = [
    "public/assets/logos/awards",
    "public/assets/logos/education",
    "public/assets/logos/general",
    "public/assets/logos/kaggle",
    "public/assets/logos/vision",
]

TRACKED_DOC_REMOVALS = [
    "docs/about-page-content.md",
    "docs/icon-size-inventory.md",
    "docs/AGENT-SYSTEM-SUMMARY.md",
    "docs/svg-icon-skill-setup.md",
    "docs/audits/open-tasks-2026-07-06.md",
    "docs/audits/simplification-refactor-2026-07-03.md",
]


def run_git_rm(paths: list[Path]) -> list[str]:
    removed: list[str] = []
    for path in paths:
        if not path.exists():
            continue
        rel = path.relative_to(ROOT).as_posix()
        subprocess.run(["git", "rm", "-r", "-f", rel], cwd=ROOT, check=True)
        removed.append(rel)
    return removed


def stage_missing_deletions(rel_paths: list[str]) -> list[str]:
    staged: list[str] = []
    for rel in rel_paths:
        proc = subprocess.run(
            ["git", "rm", "-r", "-f", "--ignore-unmatch", rel],
            cwd=ROOT,
            capture_output=True,
            text=True,
        )
        if proc.returncode == 0 and proc.stdout.strip():
            staged.append(rel)
    return staged


def remove_path(path: Path) -> str:
    if not path.exists():
        return "missing"
    if path.is_dir():
        shutil.rmtree(path)
        return "removed-dir"
    path.unlink()
    return "removed-file"


def main() -> int:
    results: list[tuple[str, str, str]] = []

    for rel in LOCAL_ONLY_DIRS:
        path = ROOT / rel
        status = remove_path(path)
        results.append(("local", rel, status))

    icon_pngs = sorted(
        p for d in ICON_PNG_DIRS for p in (ROOT / d).glob("icon_*.png") if p.is_file()
    )
    if icon_pngs:
        removed = run_git_rm(icon_pngs)
        for rel in removed:
            results.append(("git-rm", rel, "removed-file"))

    for rel in ICON_PNG_DIRS:
        path = ROOT / rel
        if path.exists() and not any(path.iterdir()):
            path.rmdir()
            results.append(("empty-dir", rel, "removed-dir"))

    draft_paths = sorted((ROOT / "content/drafts").rglob("*")) if False else []
    _ = draft_paths

    doc_removals = [ROOT / rel for rel in TRACKED_DOC_REMOVALS if (ROOT / rel).exists() or rel in {
        "docs/about-page-content.md",
        "docs/icon-size-inventory.md",
        "docs/AGENT-SYSTEM-SUMMARY.md",
        "docs/svg-icon-skill-setup.md",
        "docs/audits/simplification-refactor-2026-07-03.md",
    }]
    for rel in run_git_rm(doc_removals):
        results.append(("git-rm", rel, "removed-file"))

    for rel in [
        "docs/audits/open-tasks-2026-07-06.md",
    ]:
        status = remove_path(ROOT / rel)
        if status != "missing":
            results.append(("local", rel, status))

    # Stage already-deleted legacy content/assets from the pages migration.
    legacy_patterns = [
        "content/entities.json",
        "content/site.json",
        "content/person",
        "content/recognition",
        "content/research",
        "content/work",
        "assets/icon-collections-resized",
        "task.md",
    ]
    for rel in legacy_patterns:
        path = ROOT / rel
        if path.exists():
            for removed in run_git_rm([path]):
                results.append(("git-rm", removed, "removed"))
        else:
            for staged in stage_missing_deletions([rel]):
                results.append(("git-rm-staged", staged, "staged-deletion"))

    REPORT.parent.mkdir(parents=True, exist_ok=True)
    lines = [
        "# Aggressive Cleanup Report",
        "",
        f"- Generated at: {datetime.now(timezone.utc).isoformat()}",
        "",
        "| Kind | Path | Status |",
        "| --- | --- | --- |",
    ]
    for kind, rel, status in results:
        lines.append(f"| {kind} | `{rel}` | {status} |")
    REPORT.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Wrote {REPORT.relative_to(ROOT)} ({len(results)} actions)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
