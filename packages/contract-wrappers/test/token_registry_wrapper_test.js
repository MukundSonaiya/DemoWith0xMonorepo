"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var dev_utils_1 = require("@0xproject/dev-utils");
var json_schemas_1 = require("@0xproject/json-schemas");
var chai = require("chai");
var _ = require("lodash");
require("make-promises-safe");
require("mocha");
var src_1 = require("../src");
var chai_setup_1 = require("./utils/chai_setup");
var constants_1 = require("./utils/constants");
var web3_wrapper_1 = require("./utils/web3_wrapper");
chai_setup_1.chaiSetup.configure();
var expect = chai.expect;
var blockchainLifecycle = new dev_utils_1.BlockchainLifecycle(web3_wrapper_1.web3Wrapper);
var TOKEN_REGISTRY_SIZE_AFTER_MIGRATION = 7;
describe('TokenRegistryWrapper', function () {
    var contractWrappers;
    var tokens;
    var tokenAddressBySymbol = {};
    var tokenAddressByName = {};
    var tokenBySymbol = {};
    var tokenByName = {};
    var registeredSymbol = 'ZRX';
    var registeredName = '0x Protocol Token';
    var unregisteredSymbol = 'MAL';
    var unregisteredName = 'Malicious Token';
    var config = {
        networkId: constants_1.constants.TESTRPC_NETWORK_ID,
    };
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    contractWrappers = new src_1.ContractWrappers(web3_wrapper_1.provider, config);
                    return [4 /*yield*/, contractWrappers.tokenRegistry.getTokensAsync()];
                case 1:
                    tokens = _a.sent();
                    _.map(tokens, function (token) {
                        tokenAddressBySymbol[token.symbol] = token.address;
                        tokenAddressByName[token.name] = token.address;
                        tokenBySymbol[token.symbol] = token;
                        tokenByName[token.name] = token;
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, blockchainLifecycle.startAsync()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterEach(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, blockchainLifecycle.revertAsync()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('#getTokensAsync', function () {
        it('should return all the tokens added to the tokenRegistry during the migration', function () { return __awaiter(_this, void 0, void 0, function () {
            var schemaValidator;
            return __generator(this, function (_a) {
                expect(tokens).to.have.lengthOf(TOKEN_REGISTRY_SIZE_AFTER_MIGRATION);
                schemaValidator = new json_schemas_1.SchemaValidator();
                _.each(tokens, function (token) {
                    var validationResult = schemaValidator.validate(token, json_schemas_1.schemas.tokenSchema);
                    expect(validationResult.errors).to.have.lengthOf(0);
                });
                return [2 /*return*/];
            });
        }); });
    });
    describe('#getTokenAddressesAsync', function () {
        it('should return all the token addresses added to the tokenRegistry during the migration', function () { return __awaiter(_this, void 0, void 0, function () {
            var tokenAddresses, schemaValidator;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, contractWrappers.tokenRegistry.getTokenAddressesAsync()];
                    case 1:
                        tokenAddresses = _a.sent();
                        expect(tokenAddresses).to.have.lengthOf(TOKEN_REGISTRY_SIZE_AFTER_MIGRATION);
                        schemaValidator = new json_schemas_1.SchemaValidator();
                        _.each(tokenAddresses, function (tokenAddress) {
                            var validationResult = schemaValidator.validate(tokenAddress, json_schemas_1.schemas.addressSchema);
                            expect(validationResult.errors).to.have.lengthOf(0);
                            expect(tokenAddress).to.not.be.equal(constants_1.constants.NULL_ADDRESS);
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('#getTokenAddressBySymbol', function () {
        it('should return correct address for a token in the registry', function () { return __awaiter(_this, void 0, void 0, function () {
            var tokenAddress;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, contractWrappers.tokenRegistry.getTokenAddressBySymbolIfExistsAsync(registeredSymbol)];
                    case 1:
                        tokenAddress = _a.sent();
                        expect(tokenAddress).to.be.equal(tokenAddressBySymbol[registeredSymbol]);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return undefined for a token out of registry', function () { return __awaiter(_this, void 0, void 0, function () {
            var tokenAddress;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, contractWrappers.tokenRegistry.getTokenAddressBySymbolIfExistsAsync(unregisteredSymbol)];
                    case 1:
                        tokenAddress = _a.sent();
                        expect(tokenAddress).to.be.undefined();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('#getTokenAddressByName', function () {
        it('should return correct address for a token in the registry', function () { return __awaiter(_this, void 0, void 0, function () {
            var tokenAddress;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, contractWrappers.tokenRegistry.getTokenAddressByNameIfExistsAsync(registeredName)];
                    case 1:
                        tokenAddress = _a.sent();
                        expect(tokenAddress).to.be.equal(tokenAddressByName[registeredName]);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return undefined for a token out of registry', function () { return __awaiter(_this, void 0, void 0, function () {
            var tokenAddress;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, contractWrappers.tokenRegistry.getTokenAddressByNameIfExistsAsync(unregisteredName)];
                    case 1:
                        tokenAddress = _a.sent();
                        expect(tokenAddress).to.be.undefined();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('#getTokenBySymbol', function () {
        it('should return correct token for a token in the registry', function () { return __awaiter(_this, void 0, void 0, function () {
            var token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, contractWrappers.tokenRegistry.getTokenBySymbolIfExistsAsync(registeredSymbol)];
                    case 1:
                        token = _a.sent();
                        expect(token).to.be.deep.equal(tokenBySymbol[registeredSymbol]);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return undefined for a token out of registry', function () { return __awaiter(_this, void 0, void 0, function () {
            var token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, contractWrappers.tokenRegistry.getTokenBySymbolIfExistsAsync(unregisteredSymbol)];
                    case 1:
                        token = _a.sent();
                        expect(token).to.be.undefined();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('#getTokenByName', function () {
        it('should return correct token for a token in the registry', function () { return __awaiter(_this, void 0, void 0, function () {
            var token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, contractWrappers.tokenRegistry.getTokenByNameIfExistsAsync(registeredName)];
                    case 1:
                        token = _a.sent();
                        expect(token).to.be.deep.equal(tokenByName[registeredName]);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return undefined for a token out of registry', function () { return __awaiter(_this, void 0, void 0, function () {
            var token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, contractWrappers.tokenRegistry.getTokenByNameIfExistsAsync(unregisteredName)];
                    case 1:
                        token = _a.sent();
                        expect(token).to.be.undefined();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('#getTokenIfExistsAsync', function () {
        it('should return the token added to the tokenRegistry during the migration', function () { return __awaiter(_this, void 0, void 0, function () {
            var aToken, token, schemaValidator, validationResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        aToken = tokens[0];
                        return [4 /*yield*/, contractWrappers.tokenRegistry.getTokenIfExistsAsync(aToken.address)];
                    case 1:
                        token = _a.sent();
                        schemaValidator = new json_schemas_1.SchemaValidator();
                        validationResult = schemaValidator.validate(token, json_schemas_1.schemas.tokenSchema);
                        expect(validationResult.errors).to.have.lengthOf(0);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return return undefined when passed a token address not in the tokenRegistry', function () { return __awaiter(_this, void 0, void 0, function () {
            var unregisteredTokenAddress, tokenIfExists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        unregisteredTokenAddress = '0x5409ed021d9299bf6814279a6a1411a7e866a631';
                        return [4 /*yield*/, contractWrappers.tokenRegistry.getTokenIfExistsAsync(unregisteredTokenAddress)];
                    case 1:
                        tokenIfExists = _a.sent();
                        expect(tokenIfExists).to.be.undefined();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=token_registry_wrapper_test.js.map