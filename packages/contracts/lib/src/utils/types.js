"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExchangeStatus;
(function (ExchangeStatus) {
    ExchangeStatus[ExchangeStatus["INVALID"] = 0] = "INVALID";
    ExchangeStatus[ExchangeStatus["SUCCESS"] = 1] = "SUCCESS";
    ExchangeStatus[ExchangeStatus["ROUNDING_ERROR_TOO_LARGE"] = 2] = "ROUNDING_ERROR_TOO_LARGE";
    ExchangeStatus[ExchangeStatus["INSUFFICIENT_BALANCE_OR_ALLOWANCE"] = 3] = "INSUFFICIENT_BALANCE_OR_ALLOWANCE";
    ExchangeStatus[ExchangeStatus["TAKER_ASSET_FILL_AMOUNT_TOO_LOW"] = 4] = "TAKER_ASSET_FILL_AMOUNT_TOO_LOW";
    ExchangeStatus[ExchangeStatus["INVALID_SIGNATURE"] = 5] = "INVALID_SIGNATURE";
    ExchangeStatus[ExchangeStatus["INVALID_SENDER"] = 6] = "INVALID_SENDER";
    ExchangeStatus[ExchangeStatus["INVALID_TAKER"] = 7] = "INVALID_TAKER";
    ExchangeStatus[ExchangeStatus["INVALID_MAKER"] = 8] = "INVALID_MAKER";
    ExchangeStatus[ExchangeStatus["ORDER_INVALID_MAKER_ASSET_AMOUNT"] = 9] = "ORDER_INVALID_MAKER_ASSET_AMOUNT";
    ExchangeStatus[ExchangeStatus["ORDER_INVALID_TAKER_ASSET_AMOUNT"] = 10] = "ORDER_INVALID_TAKER_ASSET_AMOUNT";
    ExchangeStatus[ExchangeStatus["ORDER_FILLABLE"] = 11] = "ORDER_FILLABLE";
    ExchangeStatus[ExchangeStatus["ORDER_EXPIRED"] = 12] = "ORDER_EXPIRED";
    ExchangeStatus[ExchangeStatus["ORDER_FULLY_FILLED"] = 13] = "ORDER_FULLY_FILLED";
    ExchangeStatus[ExchangeStatus["ORDER_CANCELLED"] = 14] = "ORDER_CANCELLED";
})(ExchangeStatus = exports.ExchangeStatus || (exports.ExchangeStatus = {}));
var ContractName;
(function (ContractName) {
    ContractName["Ownership"] = "Ownership";
})(ContractName = exports.ContractName || (exports.ContractName = {}));
//# sourceMappingURL=types.js.map