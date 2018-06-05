"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dev_utils_1 = require("@0xproject/dev-utils");
var sol_cov_1 = require("@0xproject/sol-cov");
var _ = require("lodash");
var coverageSubprovider;
exports.coverage = {
    getCoverageSubproviderSingleton: function () {
        if (_.isUndefined(coverageSubprovider)) {
            coverageSubprovider = exports.coverage._getCoverageSubprovider();
        }
        return coverageSubprovider;
    },
    _getCoverageSubprovider: function () {
        var defaultFromAddress = dev_utils_1.devConstants.TESTRPC_FIRST_ADDRESS;
        var solCompilerArtifactAdapter = new sol_cov_1.SolCompilerArtifactAdapter();
        var subprovider = new sol_cov_1.CoverageSubprovider(solCompilerArtifactAdapter, defaultFromAddress);
        return subprovider;
    },
};
//# sourceMappingURL=coverage.js.map