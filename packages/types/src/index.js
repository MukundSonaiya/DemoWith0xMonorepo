"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Errors originating from the 0x exchange contract
 */
var ExchangeContractErrs;
(function (ExchangeContractErrs) {
    ExchangeContractErrs["OrderFillExpired"] = "ORDER_FILL_EXPIRED";
    ExchangeContractErrs["OrderCancelExpired"] = "ORDER_CANCEL_EXPIRED";
    ExchangeContractErrs["OrderCancelAmountZero"] = "ORDER_CANCEL_AMOUNT_ZERO";
    ExchangeContractErrs["OrderAlreadyCancelledOrFilled"] = "ORDER_ALREADY_CANCELLED_OR_FILLED";
    ExchangeContractErrs["OrderFillAmountZero"] = "ORDER_FILL_AMOUNT_ZERO";
    ExchangeContractErrs["OrderRemainingFillAmountZero"] = "ORDER_REMAINING_FILL_AMOUNT_ZERO";
    ExchangeContractErrs["OrderFillRoundingError"] = "ORDER_FILL_ROUNDING_ERROR";
    ExchangeContractErrs["FillBalanceAllowanceError"] = "FILL_BALANCE_ALLOWANCE_ERROR";
    ExchangeContractErrs["InsufficientTakerBalance"] = "INSUFFICIENT_TAKER_BALANCE";
    ExchangeContractErrs["InsufficientTakerAllowance"] = "INSUFFICIENT_TAKER_ALLOWANCE";
    ExchangeContractErrs["InsufficientMakerBalance"] = "INSUFFICIENT_MAKER_BALANCE";
    ExchangeContractErrs["InsufficientMakerAllowance"] = "INSUFFICIENT_MAKER_ALLOWANCE";
    ExchangeContractErrs["InsufficientTakerFeeBalance"] = "INSUFFICIENT_TAKER_FEE_BALANCE";
    ExchangeContractErrs["InsufficientTakerFeeAllowance"] = "INSUFFICIENT_TAKER_FEE_ALLOWANCE";
    ExchangeContractErrs["InsufficientMakerFeeBalance"] = "INSUFFICIENT_MAKER_FEE_BALANCE";
    ExchangeContractErrs["InsufficientMakerFeeAllowance"] = "INSUFFICIENT_MAKER_FEE_ALLOWANCE";
    ExchangeContractErrs["TransactionSenderIsNotFillOrderTaker"] = "TRANSACTION_SENDER_IS_NOT_FILL_ORDER_TAKER";
    ExchangeContractErrs["MultipleMakersInSingleCancelBatchDisallowed"] = "MULTIPLE_MAKERS_IN_SINGLE_CANCEL_BATCH_DISALLOWED";
    ExchangeContractErrs["InsufficientRemainingFillAmount"] = "INSUFFICIENT_REMAINING_FILL_AMOUNT";
    ExchangeContractErrs["MultipleTakerTokensInFillUpToDisallowed"] = "MULTIPLE_TAKER_TOKENS_IN_FILL_UP_TO_DISALLOWED";
    ExchangeContractErrs["BatchOrdersMustHaveSameExchangeAddress"] = "BATCH_ORDERS_MUST_HAVE_SAME_EXCHANGE_ADDRESS";
    ExchangeContractErrs["BatchOrdersMustHaveAtLeastOneItem"] = "BATCH_ORDERS_MUST_HAVE_AT_LEAST_ONE_ITEM";
})(ExchangeContractErrs = exports.ExchangeContractErrs || (exports.ExchangeContractErrs = {}));
var SignatureType;
(function (SignatureType) {
    SignatureType[SignatureType["Illegal"] = 0] = "Illegal";
    SignatureType[SignatureType["Invalid"] = 1] = "Invalid";
    SignatureType[SignatureType["EIP712"] = 2] = "EIP712";
    SignatureType[SignatureType["EthSign"] = 3] = "EthSign";
    SignatureType[SignatureType["Caller"] = 4] = "Caller";
    SignatureType[SignatureType["Wallet"] = 5] = "Wallet";
    SignatureType[SignatureType["Validator"] = 6] = "Validator";
    SignatureType[SignatureType["PreSigned"] = 7] = "PreSigned";
    SignatureType[SignatureType["Trezor"] = 8] = "Trezor";
})(SignatureType = exports.SignatureType || (exports.SignatureType = {}));
var AssetProxyId;
(function (AssetProxyId) {
    AssetProxyId[AssetProxyId["INVALID"] = 0] = "INVALID";
    AssetProxyId[AssetProxyId["ERC20"] = 1] = "ERC20";
    AssetProxyId[AssetProxyId["ERC721"] = 2] = "ERC721";
})(AssetProxyId = exports.AssetProxyId || (exports.AssetProxyId = {}));
//# sourceMappingURL=index.js.map