"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utils = {
    compareLineColumn: function (lhs, rhs) {
        return lhs.line !== rhs.line ? lhs.line - rhs.line : lhs.column - rhs.column;
    },
    removeHexPrefix: function (hex) {
        var hexPrefix = '0x';
        return hex.startsWith(hexPrefix) ? hex.slice(hexPrefix.length) : hex;
    },
    isRangeInside: function (childRange, parentRange) {
        return (exports.utils.compareLineColumn(parentRange.start, childRange.start) <= 0 &&
            exports.utils.compareLineColumn(childRange.end, parentRange.end) <= 0);
    },
};
//# sourceMappingURL=utils.js.map