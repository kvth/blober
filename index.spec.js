const {Blob} = require("./index");

describe('Blob', () => {
    
    describe('Blob.fromObj()', () => {
        it('Create blob from object', () => {
            const blob = Blob.fromObject({a: 1, b: 2});
            expect(blob.content).toBe(`{"a":1,"b":2}`);
            expect(blob.type).toBe("application/json");
        });
    });

    describe('Blob.prototype.toAnker()', () => {
        it('encode to <a>', () => {    
            const blob = new Blob({ filename: "1", content: "Hello World", type: "text", charset: "utf-8" });
            expect(blob.toAnker()).toBe(`<a href="data:text;charset=utf-8,Hello%20World" download="1" style="display:none;"></a>`);
        });    
    });

});

