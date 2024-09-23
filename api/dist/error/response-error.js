"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        // this.name = status.toString();
    }
}
exports.default = ResponseError;
