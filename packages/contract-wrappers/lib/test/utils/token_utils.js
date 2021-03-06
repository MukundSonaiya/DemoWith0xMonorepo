"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var types_1 = require("../../src/types");
var PROTOCOL_TOKEN_SYMBOL = 'ZRX';
var WETH_TOKEN_SYMBOL = 'WETH';
var TokenUtils = /** @class */ (function () {
    function TokenUtils(tokens) {
        this._tokens = tokens;
    }
    TokenUtils.prototype.getProtocolTokenOrThrow = function () {
        var zrxToken = _.find(this._tokens, { symbol: PROTOCOL_TOKEN_SYMBOL });
        if (_.isUndefined(zrxToken)) {
            throw new Error(types_1.InternalContractWrappersError.ZrxNotInTokenRegistry);
        }
        return zrxToken;
    };
    TokenUtils.prototype.getWethTokenOrThrow = function () {
        var wethToken = _.find(this._tokens, { symbol: WETH_TOKEN_SYMBOL });
        if (_.isUndefined(wethToken)) {
            throw new Error(types_1.InternalContractWrappersError.WethNotInTokenRegistry);
        }
        return wethToken;
    };
    TokenUtils.prototype.getDummyTokens = function () {
        var dummyTokens = _.filter(this._tokens, function (token) {
            return !_.includes([PROTOCOL_TOKEN_SYMBOL, WETH_TOKEN_SYMBOL], token.symbol);
        });
        return dummyTokens;
    };
    return TokenUtils;
}());
exports.TokenUtils = TokenUtils;
//# sourceMappingURL=token_utils.js.map