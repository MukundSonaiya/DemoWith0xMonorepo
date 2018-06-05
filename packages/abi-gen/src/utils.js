"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ethereum_types_1 = require("ethereum-types");
var fs = require("fs");
var _ = require("lodash");
var path = require("path");
var types_1 = require("./types");
exports.utils = {
    solTypeToTsType: function (paramKind, backend, solType, components) {
        var trailingArrayRegex = /\[\d*\]$/;
        if (solType.match(trailingArrayRegex)) {
            var arrayItemSolType = solType.replace(trailingArrayRegex, '');
            var arrayItemTsType = exports.utils.solTypeToTsType(paramKind, backend, arrayItemSolType, components);
            var arrayTsType = exports.utils.isUnionType(arrayItemTsType) || exports.utils.isObjectType(arrayItemTsType)
                ? "Array<" + arrayItemTsType + ">"
                : arrayItemTsType + "[]";
            return arrayTsType;
        }
        else {
            var solTypeRegexToTsType = [
                { regex: '^string$', tsType: 'string' },
                { regex: '^address$', tsType: 'string' },
                { regex: '^bool$', tsType: 'boolean' },
                { regex: '^u?int\\d*$', tsType: 'BigNumber' },
                { regex: '^bytes\\d*$', tsType: 'string' },
            ];
            if (paramKind === types_1.ParamKind.Input) {
                // web3 and ethers allow to pass those as numbers instead of bignumbers
                solTypeRegexToTsType.unshift({
                    regex: '^u?int(8|16|32)?$',
                    tsType: 'number|BigNumber',
                });
            }
            if (backend === types_1.ContractsBackend.Ethers && paramKind === types_1.ParamKind.Output) {
                // ethers-contracts automatically converts small BigNumbers to numbers
                solTypeRegexToTsType.unshift({
                    regex: '^u?int(8|16|32|48)?$',
                    tsType: 'number',
                });
            }
            for (var _i = 0, solTypeRegexToTsType_1 = solTypeRegexToTsType; _i < solTypeRegexToTsType_1.length; _i++) {
                var regexAndTxType = solTypeRegexToTsType_1[_i];
                var regex = regexAndTxType.regex, tsType = regexAndTxType.tsType;
                if (solType.match(regex)) {
                    return tsType;
                }
            }
            var TUPLE_TYPE_REGEX = '^tuple$';
            if (solType.match(TUPLE_TYPE_REGEX)) {
                var componentsType = _.map(components, function (component) {
                    var componentValueType = exports.utils.solTypeToTsType(paramKind, backend, component.type, component.components);
                    var componentType = component.name + ": " + componentValueType;
                    return componentType;
                });
                var tsType = "{" + componentsType + "}";
                return tsType;
            }
            throw new Error("Unknown Solidity type found: " + solType);
        }
    },
    isUnionType: function (tsType) {
        return tsType === 'number|BigNumber';
    },
    isObjectType: function (tsType) {
        return /^{.*}$/.test(tsType);
    },
    getPartialNameFromFileName: function (filename) {
        var name = path.parse(filename).name;
        return name;
    },
    getNamedContent: function (filename) {
        var name = exports.utils.getPartialNameFromFileName(filename);
        try {
            var content = fs.readFileSync(filename).toString();
            return {
                name: name,
                content: content,
            };
        }
        catch (err) {
            throw new Error("Failed to read " + filename + ": " + err);
        }
    },
    getEmptyConstructor: function () {
        return {
            type: ethereum_types_1.AbiType.Constructor,
            stateMutability: 'nonpayable',
            payable: false,
            inputs: [],
        };
    },
};
//# sourceMappingURL=utils.js.map