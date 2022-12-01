"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hello_1 = require("../src/hello");
describe('hellos', () => {
    it('can say hello to the world', () => {
        expect((0, hello_1.helloWorld)()).toBe(`hello world`);
    });
});
