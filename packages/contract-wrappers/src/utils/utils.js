"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("@0xproject/utils");
exports.utils = {
    spawnSwitchErr: function (name, value) {
        return new Error("Unexpected switch value: " + value + " encountered for " + name);
    },
    getCurrentUnixTimestampSec: function () {
        var milisecondsInSecond = 1000;
        return new utils_1.BigNumber(Date.now() / milisecondsInSecond).round();
    },
    getCurrentUnixTimestampMs: function () {
        return new utils_1.BigNumber(Date.now());
    },
};
//# sourceMappingURL=utils.js.map