
import { readFileSync } from 'fs';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';
const twemoji = require('twemoji');
const twOptions = { folder: 'svg', ext: '.svg' };
const emojify = (text: string) => twemoji.parse(text, twOptions);

const etcTrispace = readFileSync(`${__dirname}/../_fonts/etc-trispace.woff2`).toString('base64');
const ibmPlexSansItalic = readFileSync(`${__dirname}/../_fonts/IBMPlexSansVar-Italic.woff2`).toString('base64');
const ibmPlexSans = readFileSync(`${__dirname}/../_fonts/IBMPlexSansVar-Roman.woff2`).toString('base64');
const backgroundSvg = readFileSync(`${__dirname}/../_svgs/dashed.svg`).toString('utf8');

function getCss(theme: string) {
    return `
    @font-face {
        font-family: 'ETC Trispace';
        src: url(data:font/woff2;charset=utf-8;base64,${etcTrispace}) format('woff2');
        font-weight: 100 900;
        font-stretch: 50% 200%;
        font-display: swap;
    }
    @font-face {
        font-family: 'IBM Plex Sans Var';
        src: url(data:font/woff2;charset=utf-8;base64,${ibmPlexSansItalic}) format('woff2');
        font-style: italic;
        font-weight: 100 900;
        font-stretch: 50% 200%;
        font-display: swap;
    }
    @font-face {
        font-family: 'IBM Plex Sans Var';
        src: url(data:font/woff2;charset=utf-8;base64,${ibmPlexSans})  format("woff2");
        font-weight: 100 900;
        font-stretch: 50% 200%;
        font-display: swap;
    }
    html {
        --color--background: #fff;
        --color--sky: #d4e2ef;
        --color--gold: #c38843;
        --color--blue: #20599e;
        --color--navy: #000650;
        --color--text: var(--color--navy);
    }
    html.theme-dark {
        --color--sky: #d49145;
        --color--gold: #741a2e;
        --color--blue: #bc3451;
        --color--navy: #eccfac;
        --color--background: #1b0d0f;
    }

    body {
        background: var(--color--background);
        color: var(--color--text);
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: "IBM Plex Sans Var", monospace;
    }
    svg {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        width: 100vw;
    }
    path[class^="c"] {
        stroke-width: 2px;
        vector-effect: non-scaling-stroke;
    }
    .c0 {
        stroke:var(--color--sky);
    }
    .c1 {
        stroke:var(--color--gold);
    }
    .c2 {
        stroke:var(--color--blue);
    }
    .c3 {
        stroke:var(--color--navy);
    }
    .s1 {
        stroke-dasharray: 2;
    }
    .s2 {
        stroke-dasharray: 4;
    }
    .s3 {
        stroke-dasharray: 8;
    }
    .content {
        position: relative;
        width: 80vw;
        z-index: 1;
        padding: 32px 48px;
        background: var(--color--background);
        border: 6px solid var(--color--sky);
    }
    .heading {
        margin: 0;
        font-family: "ETC Trispace", monospace;
        font-size: 64px;
        font-style: normal;
        line-height: 1.2;
    }
    .tagline {
        margin: 1em 0 0;
        font-size: 24px;
    }
    .link {
        margin: 0;
        font-size: 18px;
        text-align: right;
        text-decoration: underline;
        text-decoration-color: var(--color--gold);
    }`;
}

export function getHtml(parsedReq: ParsedRequest) {
    const { theme, title, text } = parsedReq;
    let content = '';
    if ( text.length > 0 ) {
        content = `<p class="tagline">${text.map(txt => emojify(sanitizeHtml(txt))).join('<br />')}</p>`;
    }
    return `<!DOCTYPE html>
<html class="theme-${theme}">
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss(theme)}
    </style>
    <body>
        <div>
            ${backgroundSvg}
            <div class="content">
                <h1 class="heading">${emojify(sanitizeHtml(title))}</h1>
                ${content}
                <p class="link">ryelle.codes</p>
            </div>
        </div>
    </body>
</html>`;
}
