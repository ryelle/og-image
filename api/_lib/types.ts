export type FileType = 'png' | 'jpeg';
export type Theme = 'light' | 'dark';

export interface ImageOptions {
    type: FileType;
    isDev: boolean;
    width: number;
    height: number;
}

export interface ParsedRequest {
    fileType: FileType;
    title: string;
    text: string[];
    theme: Theme;
    width: number;
    height: number;
}
