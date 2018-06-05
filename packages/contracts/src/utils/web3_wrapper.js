"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dev_utils_1 = require("@0xproject/dev-utils");
var subproviders_1 = require("@0xproject/subproviders");
var web3_wrapper_1 = require("@0xproject/web3-wrapper");
var coverage_1 = require("./coverage");
exports.txDefaults = {
    from: dev_utils_1.devConstants.TESTRPC_FIRST_ADDRESS,
    gas: dev_utils_1.devConstants.GAS_LIMIT,
};
var providerConfigs = { shouldUseInProcessGanache: true };
exports.provider = dev_utils_1.web3Factory.getRpcProvider(providerConfigs);
var isCoverageEnabled = dev_utils_1.env.parseBoolean(dev_utils_1.EnvVars.SolidityCoverage);
if (isCoverageEnabled) {
    var coverageSubprovider = coverage_1.coverage.getCoverageSubproviderSingleton();
    subproviders_1.prependSubprovider(exports.provider, coverageSubprovider);
}
exports.web3Wrapper = new web3_wrapper_1.Web3Wrapper(exports.provider);
//# sourceMappingURL=web3_wrapper.js.map