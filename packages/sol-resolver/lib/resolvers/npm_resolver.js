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
var resolver_1 = require("./resolver");
var NPMResolver = /** @class */ (function (_super) {
    __extends(NPMResolver, _super);
    function NPMResolver(packagePath) {
        var _this = _super.call(this) || this;
        _this._packagePath = packagePath;
        return _this;
    }
    NPMResolver.prototype.resolveIfExists = function (importPath) {
        if (!importPath.startsWith('/')) {
            var _a = importPath.split('/'), packageName = _a[0], other = _a.slice(1);
            var pathWithinPackage = path.join.apply(path, other);
            var currentPath = this._packagePath;
            var ROOT_PATH = '/';
            while (currentPath !== ROOT_PATH) {
                var lookupPath = path.join(currentPath, 'node_modules', packageName, pathWithinPackage);
                if (fs.existsSync(lookupPath)) {
                    var fileContent = fs.readFileSync(lookupPath).toString();
                    return {
                        source: fileContent,
                        path: lookupPath,
                    };
                }
                currentPath = path.dirname(currentPath);
            }
        }
        return undefined;
    };
    return NPMResolver;
}(resolver_1.Resolver));
exports.NPMResolver = NPMResolver;
//# sourceMappingURL=npm_resolver.js.map