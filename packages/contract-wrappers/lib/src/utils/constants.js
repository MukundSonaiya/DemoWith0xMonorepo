"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("@0xproject/utils");
exports.constants = {
    NULL_ADDRESS: '0x0000000000000000000000000000000000000000',
    TESTRPC_NETWORK_ID: 50,
    INVALID_JUMP_PATTERN: 'invalid JUMP at',
    OUT_OF_GAS_PATTERN: 'out of gas',
    INVALID_TAKER_FORMAT: 'instance.taker is not of a type(s) string',
    // tslint:disable-next-line:custom-no-magic-numbers
    UNLIMITED_ALLOWANCE_IN_BASE_UNITS: new utils_1.BigNumber(2).pow(256).minus(1),
    DEFAULT_BLOCK_POLLING_INTERVAL: 1000,
};
//# sourceMappingURL=constants.js.map