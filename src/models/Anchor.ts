export class Anchor {
    id: string = "";
    name: string = "";

    constructor(headerText:string) {
        this.id = "markdown-" + encodeURIComponent(headerText);
        this.name = encodeURIComponent(headerText);
    }
}