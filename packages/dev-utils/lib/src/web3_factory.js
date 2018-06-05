"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// HACK: web3 injects XMLHttpRequest into the global scope and ProviderEngine checks XMLHttpRequest
// to know whether it is running in a browser or node environment. We need it to be undefined since
// we are not running in a browser env.
// Filed issue: https://github.com/ethereum/web3.js/issues/844
global.XMLHttpRequest = undefined;
var ProviderEngine = require("web3-provider-engine");
var RpcSubprovider = require("web3-provider-engine/subproviders/rpc");
var subproviders_1 = require("@0xproject/subproviders");
var fs = require("fs");
var _ = require("lodash");
var constants_1 = require("./constants");
var env_1 = require("./env");
exports.web3Factory = {
    getRpcProvider: function (config) {
        if (config === void 0) { config = {}; }
        var provider = new ProviderEngine();
        var hasAddresses = _.isUndefined(config.hasAddresses) || config.hasAddresses;
        if (!hasAddresses) {
            provider.addProvider(new subproviders_1.EmptyWalletSubprovider());
        }
        provider.addProvider(new subproviders_1.FakeGasEstimateSubprovider(constants_1.constants.GAS_LIMIT));
        var logger = {
            log: function (arg) {
                fs.appendFileSync('ganache.log', arg + "\n");
            },
        };
        var shouldUseInProcessGanache = !!config.shouldUseInProcessGanache;
        if (shouldUseInProcessGanache) {
            if (!_.isUndefined(config.rpcUrl)) {
                throw new Error('Cannot use both GanacheSubrovider and RPCSubprovider');
            }
            provider.addProvider(new subproviders_1.GanacheSubprovider({
                gasLimit: constants_1.constants.GAS_LIMIT,
                logger: logger,
                verbose: env_1.env.parseBoolean(env_1.EnvVars.VerboseGanache),
                port: 8545,
                network_id: 50,
                mnemonic: 'concert load couple harbor equip island argue ramp clarify fence smart topic',
            }));
        }
        else {
            provider.addProvider(new RpcSubprovider({
                rpcUrl: config.rpcUrl || constants_1.constants.RPC_URL,
            }));
        }
        provider.start();
        return provider;
    },
};
//# sourceMappingURL=web3_factory.js.map