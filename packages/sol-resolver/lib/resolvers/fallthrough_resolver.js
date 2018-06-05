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
var _ = require("lodash");
var resolver_1 = require("./resolver");
var FallthroughResolver = /** @class */ (function (_super) {
    __extends(FallthroughResolver, _super);
    function FallthroughResolver() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._resolvers = [];
        return _this;
    }
    FallthroughResolver.prototype.appendResolver = function (resolver) {
        this._resolvers.push(resolver);
    };
    FallthroughResolver.prototype.resolveIfExists = function (importPath) {
        for (var _i = 0, _a = this._resolvers; _i < _a.length; _i++) {
            var resolver = _a[_i];
            var contractSourceIfExists = resolver.resolveIfExists(importPath);
            if (!_.isUndefined(contractSourceIfExists)) {
                return contractSourceIfExists;
            }
        }
        return undefined;
    };
    return FallthroughResolver;
}(resolver_1.Resolver));
exports.FallthroughResolver = FallthroughResolver;
//# sourceMappingURL=fallthrough_resolver.js.map