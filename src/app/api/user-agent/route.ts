// src/app/api/user-agent/route.ts
import { NextResponse } from 'next/server';
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('http://www.encar.com/dc/dc_carsearchlist.do?carType=kor#!');
    setTimeout(() => {console.log('Waiting for 5 seconds...');}, 3000);
    const screenshotDir = '/tmp';
  const screenshotPath = path.join(screenshotDir, 'screenshot.png');
  // Убедимся, что директория существует
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }
  await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log('Screenshot saved to:', screenshotPath);
  const userAgent = await page.evaluate(() => navigator.userAgent);
  await browser.close();

  return NextResponse.json({ userAgent });
}
