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
var _ = require("lodash");
var promisify_child_process_1 = require("promisify-child-process");
var constants_1 = require("./constants");
var utils_1 = require("./utils/utils");
function checkPublishRequiredSetupAsync() {
    return __awaiter(this, void 0, void 0, function () {
        var err_1, result, version, versionSegments, majorVersion, err_2, err_3, res, gitShortStatusHeader;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    // HACK: for some reason on some setups, the `npm whoami` will not recognize a logged-in user
                    // unless run with `sudo` (i.e Fabio's NVM setup) but is fine for others (Jacob's NVM setup).
                    utils_1.utils.log('Checking that the user is logged in on npm...');
                    return [4 /*yield*/, promisify_child_process_1.exec("sudo npm whoami")];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    throw new Error('You must be logged into npm in the commandline to publish. Run `npm login` and try again.');
                case 3:
                    // Check to see if Git personal token setup
                    if (_.isUndefined(constants_1.constants.githubPersonalAccessToken)) {
                        throw new Error('You must have a Github personal access token set to an envVar named `GITHUB_PERSONAL_ACCESS_TOKEN_0X_JS`. Add it then try again.');
                    }
                    // Check Yarn version is 1.X
                    utils_1.utils.log('Checking the yarn version...');
                    return [4 /*yield*/, promisify_child_process_1.exec("yarn --version")];
                case 4:
                    result = _a.sent();
                    version = result.stdout;
                    versionSegments = version.split('.');
                    majorVersion = _.parseInt(versionSegments[0]);
                    if (majorVersion < 1) {
                        throw new Error('Your yarn version must be v1.x or higher. Upgrade yarn and try again.');
                    }
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 7, , 8]);
                    utils_1.utils.log('Checking that aws CLI tool is installed...');
                    return [4 /*yield*/, promisify_child_process_1.exec("aws help")];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 7:
                    err_2 = _a.sent();
                    throw new Error('You must have `awscli` commandline tool installed. Install it and try again.');
                case 8:
                    _a.trys.push([8, 10, , 11]);
                    utils_1.utils.log('Checking that aws credentials are configured...');
                    return [4 /*yield*/, promisify_child_process_1.exec("aws sts get-caller-identity")];
                case 9:
                    _a.sent();
                    return [3 /*break*/, 11];
                case 10:
                    err_3 = _a.sent();
                    throw new Error('You must setup your AWS credentials by running `aws configure`. Do this and try again.');
                case 11:
                    utils_1.utils.log('Checking that git branch is up to date with upstream...');
                    return [4 /*yield*/, promisify_child_process_1.exec('git fetch')];
                case 12:
                    _a.sent();
                    return [4 /*yield*/, promisify_child_process_1.exec('git status -bs')];
                case 13:
                    res = _a.sent();
                    gitShortStatusHeader = res.stdout.split('\n')[0];
                    if (gitShortStatusHeader.includes('behind')) {
                        throw new Error('Your branch is behind upstream. Please pull before publishing.');
                    }
                    else if (gitShortStatusHeader.includes('ahead')) {
                        throw new Error('Your branch is ahead of upstream. Please push before publishing.');
                    }
                    return [2 /*return*/];
            }
        });
    });
}
checkPublishRequiredSetupAsync().catch(function (err) {
    utils_1.utils.log(err.message);
    process.exit(1);
});
//# sourceMappingURL=prepublish_checks.js.map