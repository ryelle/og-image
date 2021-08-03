import { IncomingMessage } from 'http';
import { parse } from 'url';
import { ParsedRequest } from './types';

export function parseRequest(req: IncomingMessage) {
    console.log('HTTP ' + req.url);
    const { pathname, query } = parse(req.url || '/', true);
    const { width = 0, height = 0, theme } = (query || {});

    const content = getArray(query?.text);

    if (Array.isArray(theme)) {
        throw new Error('Expected a single theme');
    }
    if (Array.isArray(width)) {
        throw new Error('Expected a single width');
    }
    if (Array.isArray(height)) {
        throw new Error('Expected a single height');
    }

    const arr = (pathname || '/').slice(1).split('.');
    let extension = '';
    let title = '';
    if (arr.length === 0) {
        title = '';
    } else if (arr.length === 1) {
        title = arr[0];
    } else {
        extension = arr.pop() as string;
        title = arr.join('.');
    }

    const parsedRequest: ParsedRequest = {
        fileType: extension === 'jpeg' ? extension : 'png',
        title: decodeURIComponent(title),
        text: content.map(txt => decodeURIComponent(txt)),
        theme: theme === 'dark' ? 'dark' : 'light',
        width: Number(width),
        height: Number(height),
    };
    return parsedRequest;
}

function getArray(stringOrArray: string[] | string | undefined): string[] {
    if (typeof stringOrArray === 'undefined') {
        return [];
    } else if (Array.isArray(stringOrArray)) {
        return stringOrArray;
    } else {
        return [stringOrArray];
    }
}
