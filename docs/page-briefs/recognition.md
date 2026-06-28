# Page Brief - Recognition

**Page:** `recognition`  
**Route:** `/recognition`

## Items

| Item (section id) | Source | Question | Weight |
|---|---|---|---|
| `awards` | `content/recognition/awards.json` | Why should I trust it? | medium |
| `kaggle` | `content/recognition/kaggle.json` | Why should I trust it? | heavy |
| `education` | `content/recognition/education.json` | Why should I trust it? | light |
| `contact-teaser` | `content/person/profile.json` | What should I do next? | accent |

## Structure

`awards` -> `kaggle` -> `education` -> `contact-teaser`

The page must make awards and Kaggle rank distinct trust signals, keep education as the grounding reset, and end with one contact action.
