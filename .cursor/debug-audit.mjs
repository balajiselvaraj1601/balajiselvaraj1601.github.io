import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto('http://127.0.0.1:4321/', { waitUntil: 'networkidle' });
await page.waitForTimeout(500);
await page.goto('http://127.0.0.1:4321/experience/', { waitUntil: 'networkidle' });
await page.waitForTimeout(500);
await browser.close();
console.log('audit complete');
