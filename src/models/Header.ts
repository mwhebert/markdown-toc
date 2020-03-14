import {
    Range
} from 'vscode';
import { AnchorMode } from './AnchorMode';
import { Anchor } from './Anchor';

export class Header {
    headerMark: string = "";
    orderedListString: string = "";
    dirtyTitle: string = "";
    range: Range;

    orderArray: number[] = [];

    anchorMode: AnchorMode = AnchorMode.github;

    anchor: Anchor;

    constructor(anchorMode: AnchorMode) {
        this.anchorMode = anchorMode;
        this.range = new Range(0, 0, 0, 0);
        this.anchor = new Anchor("");
    }

    public get depth(): number {
        return this.headerMark.length;
    }

    public get isHeader(): boolean {
        return this.headerMark != "";
    }

    public tocRowWithAnchor(tocString: string): string {
        let title = this.cleanUpTitle(tocString);
        let anchor_markdown_header = require('anchor-markdown-header');
        return anchor_markdown_header(title, this.anchorMode);
    }

    public get tocWithoutOrder(): string {
        return this.dirtyTitle;
    }

    public get tocWithOrder(): string {
        return this.orderArray.join('.') + ". " + this.tocWithoutOrder;
    }

    public get fullHeaderWithOrder(): string {
        return this.headerMark + " " + this.tocWithOrder;
    }

    public get fullHeaderWithoutOrder(): string {
        return this.headerMark + " " + this.tocWithoutOrder;
    }

    private cleanUpTitle(dirtyTitle: string) {
        let title = dirtyTitle.replace(/\[(.+)]\([^)]*\)/gi, "$1"); // replace link
        title = title.replace(/<!--.+-->/gi, ""); // replace comment
        title = title.replace(/\#*_/gi, "").trim(); // replace special char
        return title;
    }
}
