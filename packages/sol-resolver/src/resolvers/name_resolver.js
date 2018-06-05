"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var enumerable_resolver_1 = require("./enumerable_resolver");
var SOLIDITY_FILE_EXTENSION = '.sol';
var NameResolver = /** @class */ (function (_super) {
    __extends(NameResolver, _super);
    function NameResolver(contractsDir) {
        var _this = _super.call(this) || this;
        _this._contractsDir = contractsDir;
        return _this;
    }
    NameResolver.prototype.resolveIfExists = function (lookupContractName) {
        var _this = this;
        var contractSource;
        var onFile = function (filePath) {
            var contractName = path.basename(filePath, SOLIDITY_FILE_EXTENSION);
            if (contractName === lookupContractName) {
                var absoluteContractPath = path.join(_this._contractsDir, filePath);
                var source = fs.readFileSync(absoluteContractPath).toString();
                contractSource = {
                    source: source,
                    path: filePath,
                };
                return true;
            }
            return undefined;
        };
        this._traverseContractsDir(this._contractsDir, onFile);
        return contractSource;
    };
    NameResolver.prototype.getAll = function () {
        var _this = this;
        var contractSources = [];
        var onFile = function (filePath) {
            var contractName = path.basename(filePath, SOLIDITY_FILE_EXTENSION);
            var absoluteContractPath = path.join(_this._contractsDir, filePath);
            var source = fs.readFileSync(absoluteContractPath).toString();
            var contractSource = {
                source: source,
                path: filePath,
            };
            contractSources.push(contractSource);
        };
        this._traverseContractsDir(this._contractsDir, onFile);
        return contractSources;
    };
    // tslint:disable-next-line:prefer-function-over-method
    NameResolver.prototype._traverseContractsDir = function (dirPath, onFile) {
        var dirContents = [];
        try {
            dirContents = fs.readdirSync(dirPath);
        }
        catch (err) {
            throw new Error("No directory found at " + dirPath);
        }
        for (var _i = 0, dirContents_1 = dirContents; _i < dirContents_1.length; _i++) {
            var fileName = dirContents_1[_i];
            var absoluteEntryPath = path.join(dirPath, fileName);
            var isDirectory = fs.lstatSync(absoluteEntryPath).isDirectory();
            var entryPath = path.relative(this._contractsDir, absoluteEntryPath);
            var isComplete = void 0;
            if (isDirectory) {
                isComplete = this._traverseContractsDir(absoluteEntryPath, onFile);
            }
            else if (fileName.endsWith(SOLIDITY_FILE_EXTENSION)) {
                isComplete = onFile(entryPath);
            }
            if (isComplete) {
                return isComplete;
            }
        }
        return false;
    };
    return NameResolver;
}(enumerable_resolver_1.EnumerableResolver));
exports.NameResolver = NameResolver;
//# sourceMappingURL=name_resolver.js.map