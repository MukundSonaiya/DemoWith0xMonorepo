#!/usr/bin/env node
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
var fs = require("fs");
var lernaGetPackages = require("lerna-get-packages");
var _ = require("lodash");
var path = require("path");
var promisify_child_process_1 = require("promisify-child-process");
var rimraf = require("rimraf");
var utils_1 = require("./utils/utils");
(function () { return __awaiter(_this, void 0, void 0, function () {
    var monorepoRootPath, lernaPackages, installablePackages, _i, installablePackages_1, installableLernaPackage, packagePath, packageName, result, packedPackageFileName, testDirectory, indexFilePath, tsConfig, tsconfigFilePath, tscBinaryPath;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                monorepoRootPath = path.join(__dirname, '../../..');
                lernaPackages = lernaGetPackages(monorepoRootPath);
                installablePackages = _.filter(lernaPackages, function (lernaPackage) {
                    return !lernaPackage.package.private &&
                        !_.isUndefined(lernaPackage.package.main) &&
                        lernaPackage.package.main.endsWith('.js');
                });
                _i = 0, installablePackages_1 = installablePackages;
                _a.label = 1;
            case 1:
                if (!(_i < installablePackages_1.length)) return [3 /*break*/, 7];
                installableLernaPackage = installablePackages_1[_i];
                packagePath = installableLernaPackage.location;
                packageName = installableLernaPackage.package.name;
                utils_1.utils.log("Testing " + packageName);
                return [4 /*yield*/, promisify_child_process_1.exec('npm pack', { cwd: packagePath })];
            case 2:
                result = _a.sent();
                packedPackageFileName = result.stdout.trim();
                testDirectory = path.join(monorepoRootPath, '../test-env');
                fs.mkdirSync(testDirectory);
                return [4 /*yield*/, promisify_child_process_1.exec('yarn init --yes', { cwd: testDirectory })];
            case 3:
                result = _a.sent();
                utils_1.utils.log("Installing " + packedPackageFileName);
                return [4 /*yield*/, promisify_child_process_1.exec("yarn add " + packagePath + "/" + packedPackageFileName, { cwd: testDirectory })];
            case 4:
                result = _a.sent();
                indexFilePath = path.join(testDirectory, 'index.ts');
                fs.writeFileSync(indexFilePath, "import * as Package from '" + packageName + "';\n");
                tsConfig = {
                    compilerOptions: {
                        typeRoots: ['node_modules/@0xproject/typescript-typings/types', 'node_modules/@types'],
                        module: 'commonjs',
                        target: 'es5',
                        lib: ['es2017', 'dom'],
                        declaration: true,
                        noImplicitReturns: true,
                        pretty: true,
                        strict: true,
                    },
                    include: ['index.ts'],
                };
                tsconfigFilePath = path.join(testDirectory, 'tsconfig.json');
                fs.writeFileSync(tsconfigFilePath, JSON.stringify(tsConfig, null, '\t'));
                utils_1.utils.log("Compiling " + packageName);
                tscBinaryPath = path.join(monorepoRootPath, './node_modules/typescript/bin/tsc');
                return [4 /*yield*/, promisify_child_process_1.exec(tscBinaryPath, { cwd: testDirectory })];
            case 5:
                _a.sent();
                utils_1.utils.log("Successfully compiled with " + packageName + " as a dependency");
                rimraf.sync(testDirectory);
                _a.label = 6;
            case 6:
                _i++;
                return [3 /*break*/, 1];
            case 7: return [2 /*return*/];
        }
    });
}); })().catch(function (err) {
    utils_1.utils.log(err.stderr);
    utils_1.utils.log(err.stdout);
    process.exit(1);
});
//# sourceMappingURL=test_installation.js.map