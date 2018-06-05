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
var promisify = require("es6-promisify");
var fs = require("fs");
var _ = require("lodash");
var moment = require("moment");
var opn = require("opn");
var path = require("path");
var promisify_child_process_1 = require("promisify-child-process");
var prompt = require("prompt");
var semverDiff = require("semver-diff");
var semverSort = require("semver-sort");
var constants_1 = require("./constants");
var types_1 = require("./types");
var changelog_utils_1 = require("./utils/changelog_utils");
var utils_1 = require("./utils/utils");
var DOC_GEN_COMMAND = 'docs:json';
var NPM_NAMESPACE = '@0xproject/';
var IS_DRY_RUN = process.env.IS_DRY_RUN === 'true';
var TODAYS_TIMESTAMP = moment().unix();
var semverNameToIndex = {
    patch: types_1.SemVerIndex.Patch,
    minor: types_1.SemVerIndex.Minor,
    major: types_1.SemVerIndex.Major,
};
var packageNameToWebsitePath = {
    '0x.js': '0xjs',
    'web3-wrapper': 'web3_wrapper',
    contracts: 'contracts',
    connect: 'connect',
    'json-schemas': 'json-schemas',
    'sol-compiler': 'sol-compiler',
    'sol-cov': 'sol-cov',
    subproviders: 'subproviders',
    'order-utils': 'order-utils',
};
(function () { return __awaiter(_this, void 0, void 0, function () {
    var shouldIncludePrivate, updatedPublicLernaPackages, updatedPublicLernaPackageNames, packageToVersionChange;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                shouldIncludePrivate = false;
                return [4 /*yield*/, utils_1.utils.getUpdatedLernaPackagesAsync(shouldIncludePrivate)];
            case 1:
                updatedPublicLernaPackages = _a.sent();
                return [4 /*yield*/, confirmDocPagesRenderAsync(updatedPublicLernaPackages)];
            case 2:
                _a.sent();
                updatedPublicLernaPackageNames = _.map(updatedPublicLernaPackages, function (pkg) { return pkg.package.name; });
                utils_1.utils.log("Will update CHANGELOGs and publish: \n" + updatedPublicLernaPackageNames.join('\n') + "\n");
                return [4 /*yield*/, updateChangeLogsAsync(updatedPublicLernaPackages)];
            case 3:
                packageToVersionChange = _a.sent();
                if (!!IS_DRY_RUN) return [3 /*break*/, 5];
                return [4 /*yield*/, pushChangelogsToGithubAsync()];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5:
                // Call LernaPublish
                utils_1.utils.log('Version updates to apply:');
                _.each(packageToVersionChange, function (versionChange, packageName) {
                    utils_1.utils.log(packageName + " -> " + versionChange);
                });
                utils_1.utils.log("Calling 'lerna publish'...");
                return [4 /*yield*/, lernaPublishAsync(packageToVersionChange)];
            case 6:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })().catch(function (err) {
    utils_1.utils.log(err);
    process.exit(1);
});
function confirmDocPagesRenderAsync(packages) {
    return __awaiter(this, void 0, void 0, function () {
        var pathToWebsite, packagesWithDocs, message, result, didConfirm;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // push docs to staging
                    utils_1.utils.log("Upload all docJson's to S3 staging...");
                    return [4 /*yield*/, promisify_child_process_1.exec("yarn stage_docs", { cwd: constants_1.constants.monorepoRootPath })];
                case 1:
                    _a.sent();
                    // deploy website to staging
                    utils_1.utils.log('Deploy website to staging...');
                    pathToWebsite = constants_1.constants.monorepoRootPath + "/packages/website";
                    return [4 /*yield*/, promisify_child_process_1.exec("yarn deploy_staging", { cwd: pathToWebsite })];
                case 2:
                    _a.sent();
                    packagesWithDocs = _.filter(packages, function (pkg) {
                        var scriptsIfExists = pkg.package.scripts;
                        if (_.isUndefined(scriptsIfExists)) {
                            throw new Error('Found a public package without any scripts in package.json');
                        }
                        return !_.isUndefined(scriptsIfExists[DOC_GEN_COMMAND]);
                    });
                    _.each(packagesWithDocs, function (pkg) {
                        var name = pkg.package.name;
                        var nameWithoutPrefix = _.startsWith(name, NPM_NAMESPACE) ? name.split('@0xproject/')[1] : name;
                        var docSegmentIfExists = packageNameToWebsitePath[nameWithoutPrefix];
                        if (_.isUndefined(docSegmentIfExists)) {
                            throw new Error("Found package '" + name + "' with doc commands but no corresponding docSegment in monorepo_scripts\npackage.ts. Please add an entry for it and try again.");
                        }
                        var link = constants_1.constants.stagingWebsite + "/docs/" + docSegmentIfExists;
                        // tslint:disable-next-line:no-floating-promises
                        opn(link);
                    });
                    prompt.start();
                    message = 'Do all the doc pages render properly? (yn)';
                    return [4 /*yield*/, promisify(prompt.get)([message])];
                case 3:
                    result = _a.sent();
                    didConfirm = result[message] === 'y';
                    if (!didConfirm) {
                        utils_1.utils.log('Publish process aborted.');
                        process.exit(0);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function pushChangelogsToGithubAsync() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, promisify_child_process_1.exec("git add . --all", { cwd: constants_1.constants.monorepoRootPath })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, promisify_child_process_1.exec("git commit -m \"Updated CHANGELOGS\"", { cwd: constants_1.constants.monorepoRootPath })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, promisify_child_process_1.exec("git push", { cwd: constants_1.constants.monorepoRootPath })];
                case 3:
                    _a.sent();
                    utils_1.utils.log("Pushed CHANGELOG updates to Github");
                    return [2 /*return*/];
            }
        });
    });
}
function updateChangeLogsAsync(updatedPublicLernaPackages) {
    return __awaiter(this, void 0, void 0, function () {
        var packageToVersionChange, _i, updatedPublicLernaPackages_1, lernaPackage, packageName, changelogJSONPath, changelogJSON, changelog, currentVersion, shouldAddNewEntry, nextPatchVersion, newChangelogEntry, lastEntry, proposedNextVersion, changelogMd, changelogMdPath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    packageToVersionChange = {};
                    _i = 0, updatedPublicLernaPackages_1 = updatedPublicLernaPackages;
                    _a.label = 1;
                case 1:
                    if (!(_i < updatedPublicLernaPackages_1.length)) return [3 /*break*/, 5];
                    lernaPackage = updatedPublicLernaPackages_1[_i];
                    packageName = lernaPackage.package.name;
                    changelogJSONPath = path.join(lernaPackage.location, 'CHANGELOG.json');
                    changelogJSON = utils_1.utils.getChangelogJSONOrCreateIfMissing(changelogJSONPath);
                    changelog = void 0;
                    try {
                        changelog = JSON.parse(changelogJSON);
                    }
                    catch (err) {
                        throw new Error(lernaPackage.package.name + "'s CHANGELOG.json contains invalid JSON. Please fix and try again.");
                    }
                    currentVersion = lernaPackage.package.version;
                    shouldAddNewEntry = changelog_utils_1.changelogUtils.shouldAddNewChangelogEntry(currentVersion, changelog);
                    if (shouldAddNewEntry) {
                        nextPatchVersion = utils_1.utils.getNextPatchVersion(currentVersion);
                        newChangelogEntry = {
                            timestamp: TODAYS_TIMESTAMP,
                            version: nextPatchVersion,
                            changes: [
                                {
                                    note: 'Dependencies updated',
                                },
                            ],
                        };
                        changelog = [newChangelogEntry].concat(changelog);
                        packageToVersionChange[packageName] = semverDiff(currentVersion, nextPatchVersion);
                    }
                    else {
                        lastEntry = changelog[0];
                        if (_.isUndefined(lastEntry.timestamp)) {
                            lastEntry.timestamp = TODAYS_TIMESTAMP;
                        }
                        proposedNextVersion = lastEntry.version;
                        lastEntry.version = updateVersionNumberIfNeeded(currentVersion, proposedNextVersion);
                        changelog[0] = lastEntry;
                        packageToVersionChange[packageName] = semverDiff(currentVersion, lastEntry.version);
                    }
                    // Save updated CHANGELOG.json
                    fs.writeFileSync(changelogJSONPath, JSON.stringify(changelog, null, '\t'));
                    return [4 /*yield*/, utils_1.utils.prettifyAsync(changelogJSONPath, constants_1.constants.monorepoRootPath)];
                case 2:
                    _a.sent();
                    utils_1.utils.log(packageName + ": Updated CHANGELOG.json");
                    changelogMd = changelog_utils_1.changelogUtils.generateChangelogMd(changelog);
                    changelogMdPath = path.join(lernaPackage.location, 'CHANGELOG.md');
                    fs.writeFileSync(changelogMdPath, changelogMd);
                    return [4 /*yield*/, utils_1.utils.prettifyAsync(changelogMdPath, constants_1.constants.monorepoRootPath)];
                case 3:
                    _a.sent();
                    utils_1.utils.log(packageName + ": Updated CHANGELOG.md");
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 1];
                case 5: return [2 /*return*/, packageToVersionChange];
            }
        });
    });
}
function lernaPublishAsync(packageToVersionChange) {
    return __awaiter(this, void 0, void 0, function () {
        var PACKAGE_REGISTRY, child, shouldPrintOutput;
        return __generator(this, function (_a) {
            PACKAGE_REGISTRY = 'https://registry.npmjs.org/';
            child = promisify_child_process_1.spawn('lerna', ['publish', "--registry=" + PACKAGE_REGISTRY], {
                cwd: constants_1.constants.monorepoRootPath,
            });
            shouldPrintOutput = false;
            child.stdout.on('data', function (data) {
                var output = data.toString('utf8');
                if (shouldPrintOutput) {
                    utils_1.utils.log(output);
                }
                var isVersionPrompt = _.includes(output, 'Select a new version');
                if (isVersionPrompt) {
                    var outputStripLeft = output.split('new version for ')[1];
                    var packageName = outputStripLeft.split(' ')[0];
                    var versionChange = packageToVersionChange[packageName];
                    var isPrivatePackage = _.isUndefined(versionChange);
                    if (isPrivatePackage) {
                        versionChange = 'patch'; // Always patch updates to private packages.
                    }
                    var semVerIndex = semverNameToIndex[versionChange];
                    child.stdin.write(semVerIndex + "\n");
                }
                var isFinalPrompt = _.includes(output, 'Are you sure you want to publish the above changes?');
                if (isFinalPrompt && !IS_DRY_RUN) {
                    child.stdin.write("y\n");
                    // After confirmations, we want to print the output to watch the `lerna publish` command
                    shouldPrintOutput = true;
                }
                else if (isFinalPrompt && IS_DRY_RUN) {
                    utils_1.utils.log("Submitted all versions to Lerna but since this is a dry run, did not confirm. You need to CTRL-C to exit.");
                }
            });
            child.stderr.on('data', function (data) {
                var output = data.toString('utf8');
                utils_1.utils.log('Stderr:', output);
            });
            return [2 /*return*/];
        });
    });
}
function updateVersionNumberIfNeeded(currentVersion, proposedNextVersion) {
    if (proposedNextVersion === currentVersion) {
        return utils_1.utils.getNextPatchVersion(currentVersion);
    }
    var sortedVersions = semverSort.desc([proposedNextVersion, currentVersion]);
    if (sortedVersions[0] !== proposedNextVersion) {
        return utils_1.utils.getNextPatchVersion(currentVersion);
    }
    return proposedNextVersion;
}
//# sourceMappingURL=publish.js.map