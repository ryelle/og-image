import core from 'puppeteer-core';
import { getOptions } from './options';
import { ImageOptions } from './types';
let _page: core.Page | null;

async function getPage(isDev: boolean) {
    if (_page) {
        return _page;
    }
    const options = await getOptions(isDev);
    const browser = await core.launch(options);
    _page = await browser.newPage();
    return _page;
}

export async function getScreenshot(html: string, { type, isDev, width, height }: ImageOptions) {
    const page = await getPage(isDev);
    await page.setViewport({ width, height });
    await page.setContent(html);
    const file = await page.screenshot({ type });
    return file;
}
