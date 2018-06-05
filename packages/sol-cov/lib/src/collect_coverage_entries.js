"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ethUtil = require("ethereumjs-util");
var _ = require("lodash");
var parser = require("solidity-parser-antlr");
var ast_visitor_1 = require("./ast_visitor");
var source_maps_1 = require("./source_maps");
// Parsing source code for each transaction/code is slow and therefore we cache it
var coverageEntriesBySourceHash = {};
exports.collectCoverageEntries = function (contractSource) {
    var sourceHash = ethUtil.sha3(contractSource).toString('hex');
    if (_.isUndefined(coverageEntriesBySourceHash[sourceHash])) {
        var ast = parser.parse(contractSource, { range: true });
        var locationByOffset = source_maps_1.getLocationByOffset(contractSource);
        var visitor = new ast_visitor_1.ASTVisitor(locationByOffset);
        parser.visit(ast, visitor);
        coverageEntriesBySourceHash[sourceHash] = visitor.getCollectedCoverageEntries();
    }
    var coverageEntriesDescription = coverageEntriesBySourceHash[sourceHash];
    return coverageEntriesDescription;
};
//# sourceMappingURL=collect_coverage_entries.js.map