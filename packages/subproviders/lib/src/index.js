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
Object.defineProperty(exports, "__esModule", { value: true });
var hw_app_eth_1 = require("@ledgerhq/hw-app-eth");
var hw_transport_u2f_1 = require("@ledgerhq/hw-transport-u2f");
var subprovider_utils_1 = require("./utils/subprovider_utils");
exports.prependSubprovider = subprovider_utils_1.prependSubprovider;
var empty_wallet_subprovider_1 = require("./subproviders/empty_wallet_subprovider");
exports.EmptyWalletSubprovider = empty_wallet_subprovider_1.EmptyWalletSubprovider;
var fake_gas_estimate_subprovider_1 = require("./subproviders/fake_gas_estimate_subprovider");
exports.FakeGasEstimateSubprovider = fake_gas_estimate_subprovider_1.FakeGasEstimateSubprovider;
var injected_web3_1 = require("./subproviders/injected_web3");
exports.InjectedWeb3Subprovider = injected_web3_1.InjectedWeb3Subprovider;
var redundant_subprovider_1 = require("./subproviders/redundant_subprovider");
exports.RedundantSubprovider = redundant_subprovider_1.RedundantSubprovider;
var ledger_1 = require("./subproviders/ledger");
exports.LedgerSubprovider = ledger_1.LedgerSubprovider;
var ganache_1 = require("./subproviders/ganache");
exports.GanacheSubprovider = ganache_1.GanacheSubprovider;
var subprovider_1 = require("./subproviders/subprovider");
exports.Subprovider = subprovider_1.Subprovider;
var nonce_tracker_1 = require("./subproviders/nonce_tracker");
exports.NonceTrackerSubprovider = nonce_tracker_1.NonceTrackerSubprovider;
var private_key_wallet_1 = require("./subproviders/private_key_wallet");
exports.PrivateKeyWalletSubprovider = private_key_wallet_1.PrivateKeyWalletSubprovider;
var mnemonic_wallet_1 = require("./subproviders/mnemonic_wallet");
exports.MnemonicWalletSubprovider = mnemonic_wallet_1.MnemonicWalletSubprovider;
var types_1 = require("./types");
exports.NonceSubproviderErrors = types_1.NonceSubproviderErrors;
/**
 * A factory method for creating a LedgerEthereumClient usable in a browser context.
 * @return LedgerEthereumClient A browser client for the LedgerSubprovider
 */
function ledgerEthereumBrowserClientFactoryAsync() {
    return __awaiter(this, void 0, void 0, function () {
        var ledgerConnection, ledgerEthClient;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, hw_transport_u2f_1.default.create()];
                case 1:
                    ledgerConnection = _a.sent();
                    ledgerEthClient = new hw_app_eth_1.default(ledgerConnection);
                    return [2 /*return*/, ledgerEthClient];
            }
        });
    });
}
exports.ledgerEthereumBrowserClientFactoryAsync = ledgerEthereumBrowserClientFactoryAsync;
//# sourceMappingURL=index.js.map