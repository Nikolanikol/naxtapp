// src/app/api/user-agent/route.ts
import { NextResponse } from 'next/server';
import { chromium } from 'playwright';

export async function GET() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://encar.com');
  const userAgent = await page.evaluate(() => navigator.userAgent);
  await browser.close();

  return NextResponse.json({ userAgent });
}
