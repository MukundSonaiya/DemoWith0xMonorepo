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
var fs = require("fs");
var lernaGetPackages = require("lerna-get-packages");
var _ = require("lodash");
var promisify_child_process_1 = require("promisify-child-process");
var constants_1 = require("../constants");
exports.utils = {
    log: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log.apply(console, args); // tslint:disable-line:no-console
    },
    getNextPatchVersion: function (currentVersion) {
        var versionSegments = currentVersion.split('.');
        var patch = _.parseInt(_.last(versionSegments));
        var newPatch = patch + 1;
        var newPatchVersion = versionSegments[0] + "." + versionSegments[1] + "." + newPatch;
        return newPatchVersion;
    },
    prettifyAsync: function (filePath, cwd) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, promisify_child_process_1.exec("prettier --write " + filePath + " --config .prettierrc", {
                            cwd: cwd,
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    },
    getUpdatedLernaPackagesAsync: function (shouldIncludePrivate) {
        return __awaiter(this, void 0, void 0, function () {
            var updatedPublicPackages, updatedPackageNames, allLernaPackages, updatedPublicLernaPackages;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getLernaUpdatedPackagesAsync(shouldIncludePrivate)];
                    case 1:
                        updatedPublicPackages = _a.sent();
                        updatedPackageNames = _.map(updatedPublicPackages, function (pkg) { return pkg.name; });
                        allLernaPackages = lernaGetPackages(constants_1.constants.monorepoRootPath);
                        updatedPublicLernaPackages = _.filter(allLernaPackages, function (pkg) {
                            return _.includes(updatedPackageNames, pkg.package.name);
                        });
                        return [2 /*return*/, updatedPublicLernaPackages];
                }
            });
        });
    },
    getLernaUpdatedPackagesAsync: function (shouldIncludePrivate) {
        return __awaiter(this, void 0, void 0, function () {
            var result, updatedPackages, updatedPublicPackages;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, promisify_child_process_1.exec(constants_1.constants.lernaExecutable + " updated --json", {
                            cwd: constants_1.constants.monorepoRootPath,
                        })];
                    case 1:
                        result = _a.sent();
                        updatedPackages = JSON.parse(result.stdout);
                        if (!shouldIncludePrivate) {
                            updatedPublicPackages = _.filter(updatedPackages, function (updatedPackage) { return !updatedPackage.private; });
                            return [2 /*return*/, updatedPublicPackages];
                        }
                        return [2 /*return*/, updatedPackages];
                }
            });
        });
    },
    getChangelogJSONIfExists: function (changelogPath) {
        try {
            var changelogJSON = fs.readFileSync(changelogPath, 'utf-8');
            return changelogJSON;
        }
        catch (err) {
            return undefined;
        }
    },
    getChangelogJSONOrCreateIfMissing: function (changelogPath) {
        var changelogIfExists = this.getChangelogJSONIfExists(changelogPath);
        if (_.isUndefined(changelogIfExists)) {
            // If none exists, create new, empty one.
            var emptyChangelogJSON = JSON.stringify([]);
            fs.writeFileSync(changelogPath, emptyChangelogJSON);
            return emptyChangelogJSON;
        }
        return changelogIfExists;
    },
};
//# sourceMappingURL=utils.js.map