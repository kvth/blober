/**
 * Create binary downloadable object.
 * @param {string} filename Name of file to download
 * @param {string} content Content of file
 * @param {string} type Mime type of file
 * @param {string} charset Charset of content
 */
class Blob {
    constructor({
        filename = "download",
        content = "",
        type = "application/octet-stream",
        charset = "utf-8"
    } = {}) {
        this.filename = filename;
        this.content = content;
        this.charset = charset;
        this.type = type;

        this.toAnker = this.toAnker.bind(this);
        this.serve = this.serve.bind(this);
        this[Symbol.toPrimitive] = this[Symbol.toPrimitive].bind(this);
    }

    static fromObject(obj) {
        return new this({
            filename: "obj.json",
            content: JSON.stringify(obj),
            type: "application/json"
        });
    }

    toAnker(filename = this.filename) {
        const url = `data:${this.type};charset=${this.charset},${encodeURIComponent(
            this.content
        )}`;
        return /* html */`<a href="${url}" download="${filename}" style="display:none;"></a>`;        return element;
    }

    [Symbol.toPrimitive](hint) {
        // cast to primitive object
        switch (hint) {
            case "string":
                return this.content;
            default:
                return null;
        }
    }

    /**
     * Open dialog in browser to download file with name and content.
     *
     * Uses data uri internally.
     */
    serve(filename = undefined, document = document) {
        let element = this.toAnker(filename);

        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
}

module.exports = {
    Blob,
};
