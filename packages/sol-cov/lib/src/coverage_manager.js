"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
var utils_1 = require("@0xproject/utils");
var ethereumjs_util_1 = require("ethereumjs-util");
var fs = require("fs");
var istanbul_1 = require("istanbul");
var _ = require("lodash");
var loglevel_1 = require("loglevel");
var mkdirp = require("mkdirp");
var collect_coverage_entries_1 = require("./collect_coverage_entries");
var constants_1 = require("./constants");
var source_maps_1 = require("./source_maps");
var utils_2 = require("./utils");
var mkdirpAsync = utils_1.promisify(mkdirp);
var CoverageManager = /** @class */ (function () {
    function CoverageManager(artifactAdapter, getContractCodeAsync, isVerbose) {
        this._traceInfos = [];
        this._getContractCodeAsync = getContractCodeAsync;
        this._artifactAdapter = artifactAdapter;
        this._logger = loglevel_1.getLogger('sol-cov');
        this._logger.setLevel(isVerbose ? loglevel_1.levels.TRACE : loglevel_1.levels.ERROR);
    }
    CoverageManager._getSingleFileCoverageForTrace = function (contractData, coveredPcs, pcToSourceRange, fileIndex) {
        var absoluteFileName = contractData.sources[fileIndex];
        var coverageEntriesDescription = collect_coverage_entries_1.collectCoverageEntries(contractData.sourceCodes[fileIndex]);
        var sourceRanges = _.map(coveredPcs, function (coveredPc) { return pcToSourceRange[coveredPc]; });
        sourceRanges = _.compact(sourceRanges); // Some PC's don't map to a source range and we just ignore them.
        // By default lodash does a shallow object comparasion. We JSON.stringify them and compare as strings.
        sourceRanges = _.uniqBy(sourceRanges, function (s) { return JSON.stringify(s); }); // We don't care if one PC was covered multiple times within a single transaction
        sourceRanges = _.filter(sourceRanges, function (sourceRange) { return sourceRange.fileName === absoluteFileName; });
        var branchCoverage = {};
        var branchIds = _.keys(coverageEntriesDescription.branchMap);
        for (var _i = 0, branchIds_1 = branchIds; _i < branchIds_1.length; _i++) {
            var branchId = branchIds_1[_i];
            var branchDescription = coverageEntriesDescription.branchMap[branchId];
            var isCoveredByBranchIndex = _.map(branchDescription.locations, function (location) {
                return _.some(sourceRanges, function (range) { return utils_2.utils.isRangeInside(range.location, location); });
            });
            branchCoverage[branchId] = isCoveredByBranchIndex;
        }
        var statementCoverage = {};
        var statementIds = _.keys(coverageEntriesDescription.statementMap);
        var _loop_1 = function (statementId) {
            var statementDescription = coverageEntriesDescription.statementMap[statementId];
            var isCovered = _.some(sourceRanges, function (range) { return utils_2.utils.isRangeInside(range.location, statementDescription); });
            statementCoverage[statementId] = isCovered;
        };
        for (var _a = 0, statementIds_1 = statementIds; _a < statementIds_1.length; _a++) {
            var statementId = statementIds_1[_a];
            _loop_1(statementId);
        }
        var functionCoverage = {};
        var functionIds = _.keys(coverageEntriesDescription.fnMap);
        var _loop_2 = function (fnId) {
            var functionDescription = coverageEntriesDescription.fnMap[fnId];
            var isCovered = _.some(sourceRanges, function (range) {
                return utils_2.utils.isRangeInside(range.location, functionDescription.loc);
            });
            functionCoverage[fnId] = isCovered;
        };
        for (var _b = 0, functionIds_1 = functionIds; _b < functionIds_1.length; _b++) {
            var fnId = functionIds_1[_b];
            _loop_2(fnId);
        }
        var _loop_3 = function (modifierStatementId) {
            if (statementCoverage[modifierStatementId]) {
                return "continue";
            }
            var modifierDescription = coverageEntriesDescription.statementMap[modifierStatementId];
            var enclosingFunction = _.find(coverageEntriesDescription.fnMap, function (functionDescription) {
                return utils_2.utils.isRangeInside(modifierDescription, functionDescription.loc);
            });
            var isModifierCovered = _.some(coverageEntriesDescription.statementMap, function (statementDescription, statementId) {
                var isInsideTheModifierEnclosingFunction = utils_2.utils.isRangeInside(statementDescription, enclosingFunction.loc);
                var isCovered = statementCoverage[statementId];
                return isInsideTheModifierEnclosingFunction && isCovered;
            });
            statementCoverage[modifierStatementId] = isModifierCovered;
        };
        // HACK: Solidity doesn't emit any opcodes that map back to modifiers with no args, that's why we map back to the
        // function range and check if there is any covered statement within that range.
        for (var _c = 0, _d = coverageEntriesDescription.modifiersStatementIds; _c < _d.length; _c++) {
            var modifierStatementId = _d[_c];
            _loop_3(modifierStatementId);
        }
        var partialCoverage = (_e = {},
            _e[absoluteFileName] = __assign({}, coverageEntriesDescription, { l: {}, path: absoluteFileName, f: functionCoverage, s: statementCoverage, b: branchCoverage }),
            _e);
        return partialCoverage;
        var _e;
    };
    CoverageManager._bytecodeToBytecodeRegex = function (bytecode) {
        var bytecodeRegex = bytecode
            .replace(/_.*_/, '.*')
            .replace(/.{86}$/, '')
            .replace(/^0x730000000000000000000000000000000000000000/, '0x73........................................');
        return bytecodeRegex;
    };
    CoverageManager._getContractDataIfExists = function (contractsData, bytecode) {
        if (!bytecode.startsWith('0x')) {
            throw new Error("0x hex prefix missing: " + bytecode);
        }
        var contractData = _.find(contractsData, function (contractDataCandidate) {
            var bytecodeRegex = CoverageManager._bytecodeToBytecodeRegex(contractDataCandidate.bytecode);
            var runtimeBytecodeRegex = CoverageManager._bytecodeToBytecodeRegex(contractDataCandidate.runtimeBytecode);
            // We use that function to find by bytecode or runtimeBytecode. Those are quasi-random strings so
            // collisions are practically impossible and it allows us to reuse that code
            return !_.isNull(bytecode.match(bytecodeRegex)) || !_.isNull(bytecode.match(runtimeBytecodeRegex));
        });
        return contractData;
    };
    CoverageManager.prototype.appendTraceInfo = function (traceInfo) {
        this._traceInfos.push(traceInfo);
    };
    CoverageManager.prototype.writeCoverageAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var finalCoverage, stringifiedCoverage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._computeCoverageAsync()];
                    case 1:
                        finalCoverage = _a.sent();
                        stringifiedCoverage = JSON.stringify(finalCoverage, null, '\t');
                        return [4 /*yield*/, mkdirpAsync('coverage')];
                    case 2:
                        _a.sent();
                        fs.writeFileSync('coverage/coverage.json', stringifiedCoverage);
                        return [2 /*return*/];
                }
            });
        });
    };
    CoverageManager.prototype._computeCoverageAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var contractsData, collector, _i, _a, traceInfo, runtimeBytecode, contractData, bytecodeHex, sourceMap, pcToSourceRange, fileIndex, singleFileCoverageForTrace, bytecode, contractData, bytecodeHex, sourceMap, pcToSourceRange, fileIndex, singleFileCoverageForTrace;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this._artifactAdapter.collectContractsDataAsync()];
                    case 1:
                        contractsData = _b.sent();
                        collector = new istanbul_1.Collector();
                        for (_i = 0, _a = this._traceInfos; _i < _a.length; _i++) {
                            traceInfo = _a[_i];
                            if (traceInfo.address !== constants_1.constants.NEW_CONTRACT) {
                                runtimeBytecode = traceInfo.runtimeBytecode;
                                contractData = CoverageManager._getContractDataIfExists(contractsData, runtimeBytecode);
                                if (_.isUndefined(contractData)) {
                                    this._logger.warn("Transaction to an unknown address: " + traceInfo.address);
                                    continue;
                                }
                                bytecodeHex = ethereumjs_util_1.stripHexPrefix(runtimeBytecode);
                                sourceMap = contractData.sourceMapRuntime;
                                pcToSourceRange = source_maps_1.parseSourceMap(contractData.sourceCodes, sourceMap, bytecodeHex, contractData.sources);
                                for (fileIndex = 0; fileIndex < contractData.sources.length; fileIndex++) {
                                    singleFileCoverageForTrace = CoverageManager._getSingleFileCoverageForTrace(contractData, traceInfo.coveredPcs, pcToSourceRange, fileIndex);
                                    collector.add(singleFileCoverageForTrace);
                                }
                            }
                            else {
                                bytecode = traceInfo.bytecode;
                                contractData = CoverageManager._getContractDataIfExists(contractsData, bytecode);
                                if (_.isUndefined(contractData)) {
                                    this._logger.warn("Unknown contract creation transaction");
                                    continue;
                                }
                                bytecodeHex = ethereumjs_util_1.stripHexPrefix(bytecode);
                                sourceMap = contractData.sourceMap;
                                pcToSourceRange = source_maps_1.parseSourceMap(contractData.sourceCodes, sourceMap, bytecodeHex, contractData.sources);
                                for (fileIndex = 0; fileIndex < contractData.sources.length; fileIndex++) {
                                    singleFileCoverageForTrace = CoverageManager._getSingleFileCoverageForTrace(contractData, traceInfo.coveredPcs, pcToSourceRange, fileIndex);
                                    collector.add(singleFileCoverageForTrace);
                                }
                            }
                        }
                        return [2 /*return*/, collector.getFinalCoverage()];
                }
            });
        });
    };
    return CoverageManager;
}());
exports.CoverageManager = CoverageManager;
//# sourceMappingURL=coverage_manager.js.map