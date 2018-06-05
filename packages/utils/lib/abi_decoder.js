"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ethereum_types_1 = require("ethereum-types");
var ethers = require("ethers");
var _ = require("lodash");
var address_utils_1 = require("./address_utils");
var configured_bignumber_1 = require("./configured_bignumber");
var AbiDecoder = /** @class */ (function () {
    function AbiDecoder(abiArrays) {
        this._savedABIs = [];
        this._methodIds = {};
        _.forEach(abiArrays, this.addABI.bind(this));
    }
    // This method can only decode logs from the 0x & ERC20 smart contracts
    AbiDecoder.prototype.tryToDecodeLogOrNoop = function (log) {
        var methodId = log.topics[0];
        var event = this._methodIds[methodId];
        if (_.isUndefined(event)) {
            return log;
        }
        var ethersInterface = new ethers.Interface([event]);
        var logData = log.data;
        var decodedParams = {};
        var topicsIndex = 1;
        var nonIndexedInputs = _.filter(event.inputs, function (input) { return !input.indexed; });
        var dataTypes = _.map(nonIndexedInputs, function (input) { return input.type; });
        var decodedData = ethersInterface.events[event.name].parse(log.data);
        var didFailToDecode = false;
        _.forEach(event.inputs, function (param, i) {
            // Indexed parameters are stored in topics. Non-indexed ones in decodedData
            var value = param.indexed ? log.topics[topicsIndex++] : decodedData[i];
            if (_.isUndefined(value)) {
                didFailToDecode = true;
                return;
            }
            if (param.type === ethereum_types_1.SolidityTypes.Address) {
                var baseHex = 16;
                value = address_utils_1.addressUtils.padZeros(new configured_bignumber_1.BigNumber(value).toString(baseHex));
            }
            else if (param.type === ethereum_types_1.SolidityTypes.Uint256 || param.type === ethereum_types_1.SolidityTypes.Uint) {
                value = new configured_bignumber_1.BigNumber(value);
            }
            else if (param.type === ethereum_types_1.SolidityTypes.Uint8) {
                value = new configured_bignumber_1.BigNumber(value).toNumber();
            }
            decodedParams[param.name] = value;
        });
        if (didFailToDecode) {
            return log;
        }
        else {
            return __assign({}, log, { event: event.name, args: decodedParams });
        }
    };
    AbiDecoder.prototype.addABI = function (abiArray) {
        var _this = this;
        if (_.isUndefined(abiArray)) {
            return;
        }
        var ethersInterface = new ethers.Interface(abiArray);
        _.map(abiArray, function (abi) {
            if (abi.type === ethereum_types_1.AbiType.Event) {
                var topic = ethersInterface.events[abi.name].topics[0];
                _this._methodIds[topic] = abi;
            }
        });
        this._savedABIs = this._savedABIs.concat(abiArray);
    };
    return AbiDecoder;
}());
exports.AbiDecoder = AbiDecoder;
//# sourceMappingURL=abi_decoder.js.map