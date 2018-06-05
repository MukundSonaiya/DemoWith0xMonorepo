"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
exports.constants = {
    monorepoRootPath: path.join(__dirname, '../../..'),
    stagingWebsite: 'http://staging-0xproject.s3-website-us-east-1.amazonaws.com',
    lernaExecutable: path.join('node_modules', 'lerna', 'bin', 'lerna.js'),
    githubPersonalAccessToken: process.env.GITHUB_PERSONAL_ACCESS_TOKEN_0X_JS,
};
//# sourceMappingURL=constants.js.map