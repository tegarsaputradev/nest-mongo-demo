"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compare = exports.make = void 0;
const bcrypt = require("bcrypt");
function make(password) {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
}
exports.make = make;
function compare(password, hash) {
    if (!password || !hash) {
        return false;
    }
    return bcrypt.compareSync(password, hash);
}
exports.compare = compare;
//# sourceMappingURL=hash.js.map