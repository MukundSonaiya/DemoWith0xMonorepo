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
var async_child_process_1 = require("async-child-process");
var promisify = require("es6-promisify");
var fs = require("fs");
var _ = require("lodash");
var path = require("path");
var publishRelease = require("publish-release");
var constants_1 = require("./constants");
var utils_1 = require("./utils/utils");
var publishReleaseAsync = promisify(publishRelease);
var generatedDocsDirectoryName = 'generated_docs';
exports.postpublishUtils = {
    generateConfig: function (packageJSON, tsConfigJSON, cwd) {
        if (_.isUndefined(packageJSON.name)) {
            throw new Error('name field required in package.json. Cannot publish release notes to Github.');
        }
        if (_.isUndefined(packageJSON.version)) {
            throw new Error('version field required in package.json. Cannot publish release notes to Github.');
        }
        var postpublishConfig = _.get(packageJSON, 'config.postpublish', {});
        var configs = {
            cwd: cwd,
            packageName: packageJSON.name,
            version: packageJSON.version,
            assets: _.get(postpublishConfig, 'assets', []),
            docPublishConfigs: {
                fileIncludes: tsConfigJSON.include.concat(_.get(postpublishConfig, 'docPublishConfigs.extraFileIncludes', [])),
                s3BucketPath: _.get(postpublishConfig, 'docPublishConfigs.s3BucketPath'),
                s3StagingBucketPath: _.get(postpublishConfig, 'docPublishConfigs.s3StagingBucketPath'),
            },
        };
        return configs;
    },
    runAsync: function (packageJSON, tsConfigJSON, cwd) {
        return __awaiter(this, void 0, void 0, function () {
            var configs, release;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        configs = this.generateConfig(packageJSON, tsConfigJSON, cwd);
                        return [4 /*yield*/, this.publishReleaseNotesAsync(configs.cwd, configs.packageName, configs.version, configs.assets)];
                    case 1:
                        release = _a.sent();
                        if (!(!_.isUndefined(configs.docPublishConfigs.s3BucketPath) ||
                            !_.isUndefined(configs.docPublishConfigs.s3StagingBucketPath))) return [3 /*break*/, 3];
                        utils_1.utils.log('POSTPUBLISH: Release successful, generating docs...');
                        return [4 /*yield*/, exports.postpublishUtils.generateAndUploadDocsAsync(configs.cwd, configs.docPublishConfigs.fileIncludes, configs.version, configs.docPublishConfigs.s3BucketPath)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        utils_1.utils.log("POSTPUBLISH: No S3Bucket config found for " + packageJSON.name + ". Skipping doc JSON generation.");
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    publishDocsToStagingAsync: function (packageJSON, tsConfigJSON, cwd) {
        return __awaiter(this, void 0, void 0, function () {
            var configs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        configs = this.generateConfig(packageJSON, tsConfigJSON, cwd);
                        if (_.isUndefined(configs.docPublishConfigs.s3StagingBucketPath)) {
                            utils_1.utils.log('config.postpublish.docPublishConfigs.s3StagingBucketPath entry in package.json not found!');
                            return [2 /*return*/];
                        }
                        utils_1.utils.log('POSTPUBLISH: Generating docs...');
                        return [4 /*yield*/, exports.postpublishUtils.generateAndUploadDocsAsync(configs.cwd, configs.docPublishConfigs.fileIncludes, configs.version, configs.docPublishConfigs.s3StagingBucketPath)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    },
    publishReleaseNotesAsync: function (cwd, packageName, version, assets) {
        return __awaiter(this, void 0, void 0, function () {
            var notes, releaseName, tag, finalAssets, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        notes = this.getReleaseNotes(packageName, version);
                        releaseName = this.getReleaseName(packageName, version);
                        tag = this.getTag(packageName, version);
                        finalAssets = this.adjustAssetPaths(cwd, assets);
                        utils_1.utils.log('POSTPUBLISH: Releasing ', releaseName, '...');
                        return [4 /*yield*/, publishReleaseAsync({
                                token: constants_1.constants.githubPersonalAccessToken,
                                owner: '0xProject',
                                repo: '0x-monorepo',
                                tag: tag,
                                name: releaseName,
                                notes: notes,
                                draft: false,
                                prerelease: false,
                                reuseRelease: true,
                                reuseDraftOnly: false,
                                assets: assets,
                            })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    },
    getReleaseNotes: function (packageName, version) {
        var packageNameWithNamespace = packageName.replace('@0xproject/', '');
        var changelogJSONPath = path.join(constants_1.constants.monorepoRootPath, 'packages', packageNameWithNamespace, 'CHANGELOG.json');
        var changelogJSON = fs.readFileSync(changelogJSONPath, 'utf-8');
        var changelogs = JSON.parse(changelogJSON);
        var latestLog = changelogs[0];
        // We sanity check that the version for the changelog notes we are about to publish to Github
        // correspond to the new version of the package.
        if (version !== latestLog.version) {
            throw new Error('Expected CHANGELOG.json latest entry version to coincide with published version.');
        }
        var notes = '';
        _.each(latestLog.changes, function (change) {
            notes += "* " + change.note;
            if (change.pr) {
                notes += " (" + change.pr + ")";
            }
            notes += "\n";
        });
        return notes;
    },
    getTag: function (packageName, version) {
        return packageName + "@" + version;
    },
    getReleaseName: function (subPackageName, version) {
        var releaseName = subPackageName + " v" + version;
        return releaseName;
    },
    adjustAssetPaths: function (cwd, assets) {
        var finalAssets = [];
        _.each(assets, function (asset) {
            finalAssets.push(cwd + "/" + asset);
        });
        return finalAssets;
    },
    adjustFileIncludePaths: function (fileIncludes, cwd) {
        var fileIncludesAdjusted = _.map(fileIncludes, function (fileInclude) {
            var includePath = _.startsWith(fileInclude, './')
                ? cwd + "/" + fileInclude.substr(2)
                : cwd + "/" + fileInclude;
            // HACK: tsconfig.json needs wildcard directory endings as `/**/*`
            // but TypeDoc needs it as `/**` in order to pick up files at the root
            if (_.endsWith(includePath, '/**/*')) {
                // tslint:disable-next-line:custom-no-magic-numbers
                includePath = includePath.slice(0, -2);
            }
            return includePath;
        });
        return fileIncludesAdjusted;
    },
    generateAndUploadDocsAsync: function (cwd, fileIncludes, version, S3BucketPath) {
        return __awaiter(this, void 0, void 0, function () {
            var fileIncludesAdjusted, projectFiles, jsonFilePath, result, fileName, s3Url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fileIncludesAdjusted = this.adjustFileIncludePaths(fileIncludes, cwd);
                        projectFiles = fileIncludesAdjusted.join(' ');
                        jsonFilePath = cwd + "/" + generatedDocsDirectoryName + "/index.json";
                        return [4 /*yield*/, async_child_process_1.execAsync("JSON_FILE_PATH=" + jsonFilePath + " PROJECT_FILES=\"" + projectFiles + "\" yarn docs:json", {
                                cwd: cwd,
                            })];
                    case 1:
                        result = _a.sent();
                        if (!_.isEmpty(result.stderr)) {
                            throw new Error(result.stderr);
                        }
                        fileName = "v" + version + ".json";
                        utils_1.utils.log("POSTPUBLISH: Doc generation successful, uploading docs... as " + fileName);
                        s3Url = S3BucketPath + fileName;
                        return [4 /*yield*/, async_child_process_1.execAsync("S3_URL=" + s3Url + " yarn upload_docs_json", {
                                cwd: cwd,
                            })];
                    case 2:
                        _a.sent();
                        // Remove the generated docs directory
                        return [4 /*yield*/, async_child_process_1.execAsync("rm -rf " + generatedDocsDirectoryName, {
                                cwd: cwd,
                            })];
                    case 3:
                        // Remove the generated docs directory
                        _a.sent();
                        utils_1.utils.log("POSTPUBLISH: Docs uploaded to S3 bucket: " + S3BucketPath);
                        return [2 /*return*/];
                }
            });
        });
    },
};
//# sourceMappingURL=postpublish_utils.js.map