"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ContractWrappersError;
(function (ContractWrappersError) {
    ContractWrappersError["ExchangeContractDoesNotExist"] = "EXCHANGE_CONTRACT_DOES_NOT_EXIST";
    ContractWrappersError["ZRXContractDoesNotExist"] = "ZRX_CONTRACT_DOES_NOT_EXIST";
    ContractWrappersError["EtherTokenContractDoesNotExist"] = "ETHER_TOKEN_CONTRACT_DOES_NOT_EXIST";
    ContractWrappersError["TokenTransferProxyContractDoesNotExist"] = "TOKEN_TRANSFER_PROXY_CONTRACT_DOES_NOT_EXIST";
    ContractWrappersError["TokenRegistryContractDoesNotExist"] = "TOKEN_REGISTRY_CONTRACT_DOES_NOT_EXIST";
    ContractWrappersError["TokenContractDoesNotExist"] = "TOKEN_CONTRACT_DOES_NOT_EXIST";
    ContractWrappersError["ContractNotDeployedOnNetwork"] = "CONTRACT_NOT_DEPLOYED_ON_NETWORK";
    ContractWrappersError["InsufficientAllowanceForTransfer"] = "INSUFFICIENT_ALLOWANCE_FOR_TRANSFER";
    ContractWrappersError["InsufficientBalanceForTransfer"] = "INSUFFICIENT_BALANCE_FOR_TRANSFER";
    ContractWrappersError["InsufficientEthBalanceForDeposit"] = "INSUFFICIENT_ETH_BALANCE_FOR_DEPOSIT";
    ContractWrappersError["InsufficientWEthBalanceForWithdrawal"] = "INSUFFICIENT_WETH_BALANCE_FOR_WITHDRAWAL";
    ContractWrappersError["InvalidJump"] = "INVALID_JUMP";
    ContractWrappersError["OutOfGas"] = "OUT_OF_GAS";
    ContractWrappersError["SubscriptionNotFound"] = "SUBSCRIPTION_NOT_FOUND";
    ContractWrappersError["SubscriptionAlreadyPresent"] = "SUBSCRIPTION_ALREADY_PRESENT";
})(ContractWrappersError = exports.ContractWrappersError || (exports.ContractWrappersError = {}));
var InternalContractWrappersError;
(function (InternalContractWrappersError) {
    InternalContractWrappersError["NoAbiDecoder"] = "NO_ABI_DECODER";
    InternalContractWrappersError["ZrxNotInTokenRegistry"] = "ZRX_NOT_IN_TOKEN_REGISTRY";
    InternalContractWrappersError["WethNotInTokenRegistry"] = "WETH_NOT_IN_TOKEN_REGISTRY";
})(InternalContractWrappersError = exports.InternalContractWrappersError || (exports.InternalContractWrappersError = {}));
var ExchangeContractErrCodes;
(function (ExchangeContractErrCodes) {
    ExchangeContractErrCodes[ExchangeContractErrCodes["ERROR_FILL_EXPIRED"] = 0] = "ERROR_FILL_EXPIRED";
    ExchangeContractErrCodes[ExchangeContractErrCodes["ERROR_FILL_NO_VALUE"] = 1] = "ERROR_FILL_NO_VALUE";
    ExchangeContractErrCodes[ExchangeContractErrCodes["ERROR_FILL_TRUNCATION"] = 2] = "ERROR_FILL_TRUNCATION";
    ExchangeContractErrCodes[ExchangeContractErrCodes["ERROR_FILL_BALANCE_ALLOWANCE"] = 3] = "ERROR_FILL_BALANCE_ALLOWANCE";
    ExchangeContractErrCodes[ExchangeContractErrCodes["ERROR_CANCEL_EXPIRED"] = 4] = "ERROR_CANCEL_EXPIRED";
    ExchangeContractErrCodes[ExchangeContractErrCodes["ERROR_CANCEL_NO_VALUE"] = 5] = "ERROR_CANCEL_NO_VALUE";
})(ExchangeContractErrCodes = exports.ExchangeContractErrCodes || (exports.ExchangeContractErrCodes = {}));
var TradeSide;
(function (TradeSide) {
    TradeSide["Maker"] = "maker";
    TradeSide["Taker"] = "taker";
})(TradeSide = exports.TradeSide || (exports.TradeSide = {}));
var TransferType;
(function (TransferType) {
    TransferType["Trade"] = "trade";
    TransferType["Fee"] = "fee";
})(TransferType = exports.TransferType || (exports.TransferType = {}));
//# sourceMappingURL=types.js.map