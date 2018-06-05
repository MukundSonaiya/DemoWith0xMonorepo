#!/usr/bin/env node
"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var fs = require("fs");
var glob_1 = require("glob");
var _ = require("lodash");
var utils_1 = require("./utils/utils");
var PACKAGE_JSON_GLOB = '../*/package.json';
function getDependencies(path) {
    var file = fs.readFileSync(path).toString();
    var parsed = JSON.parse(file);
    var dependencies = __assign({}, parsed.dependencies, parsed.devDependencies);
    return dependencies;
}
var files = glob_1.sync(PACKAGE_JSON_GLOB);
var versionsByDependency = {};
files.map(function (path) {
    var _a = path.split('/'), _1 = _a[0], packageName = _a[1], _2 = _a[2];
    var dependencies = getDependencies(path);
    _.map(dependencies, function (version, depName) {
        if (_.isUndefined(versionsByDependency[depName])) {
            versionsByDependency[depName] = {};
        }
        versionsByDependency[depName][packageName] = version;
    });
});
_.map(versionsByDependency, function (versions, depName) {
    if (_.uniq(_.values(versions)).length === 1) {
        delete versionsByDependency[depName];
    }
    else {
        utils_1.utils.log(chalk_1.default.bold(depName));
        _.map(versions, function (version, packageName) {
            utils_1.utils.log("\u251C\u2500\u2500 " + packageName + " -> " + version);
        });
    }
});
//# sourceMappingURL=deps_versions.js.map