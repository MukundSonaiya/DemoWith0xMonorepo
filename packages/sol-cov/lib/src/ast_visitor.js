"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var BranchType;
(function (BranchType) {
    BranchType["If"] = "if";
    BranchType["ConditionalExpression"] = "cond-expr";
    BranchType["BinaryExpression"] = "binary-expr";
})(BranchType || (BranchType = {}));
var ASTVisitor = /** @class */ (function () {
    function ASTVisitor(locationByOffset) {
        this._entryId = 0;
        this._fnMap = {};
        this._branchMap = {};
        this._modifiersStatementIds = [];
        this._statementMap = {};
        this._locationByOffset = locationByOffset;
    }
    ASTVisitor.prototype.getCollectedCoverageEntries = function () {
        var coverageEntriesDescription = {
            fnMap: this._fnMap,
            branchMap: this._branchMap,
            statementMap: this._statementMap,
            modifiersStatementIds: this._modifiersStatementIds,
        };
        return coverageEntriesDescription;
    };
    ASTVisitor.prototype.IfStatement = function (ast) {
        this._visitStatement(ast);
        this._visitBinaryBranch(ast, ast.trueBody, ast.falseBody || ast, BranchType.If);
    };
    ASTVisitor.prototype.FunctionDefinition = function (ast) {
        this._visitFunctionLikeDefinition(ast);
    };
    ASTVisitor.prototype.ModifierDefinition = function (ast) {
        this._visitFunctionLikeDefinition(ast);
    };
    ASTVisitor.prototype.ForStatement = function (ast) {
        this._visitStatement(ast);
    };
    ASTVisitor.prototype.ReturnStatement = function (ast) {
        this._visitStatement(ast);
    };
    ASTVisitor.prototype.BreakStatement = function (ast) {
        this._visitStatement(ast);
    };
    ASTVisitor.prototype.ContinueStatement = function (ast) {
        this._visitStatement(ast);
    };
    ASTVisitor.prototype.VariableDeclarationStatement = function (ast) {
        this._visitStatement(ast);
    };
    ASTVisitor.prototype.Statement = function (ast) {
        this._visitStatement(ast);
    };
    ASTVisitor.prototype.WhileStatement = function (ast) {
        this._visitStatement(ast);
    };
    ASTVisitor.prototype.SimpleStatement = function (ast) {
        this._visitStatement(ast);
    };
    ASTVisitor.prototype.ThrowStatement = function (ast) {
        this._visitStatement(ast);
    };
    ASTVisitor.prototype.DoWhileStatement = function (ast) {
        this._visitStatement(ast);
    };
    ASTVisitor.prototype.ExpressionStatement = function (ast) {
        this._visitStatement(ast.expression);
    };
    ASTVisitor.prototype.InlineAssemblyStatement = function (ast) {
        this._visitStatement(ast);
    };
    ASTVisitor.prototype.BinaryOperation = function (ast) {
        var BRANCHING_BIN_OPS = ['&&', '||'];
        if (_.includes(BRANCHING_BIN_OPS, ast.operator)) {
            this._visitBinaryBranch(ast, ast.left, ast.right, BranchType.BinaryExpression);
        }
    };
    ASTVisitor.prototype.Conditional = function (ast) {
        this._visitBinaryBranch(ast, ast.trueExpression, ast.falseExpression, BranchType.ConditionalExpression);
    };
    ASTVisitor.prototype.ModifierInvocation = function (ast) {
        var BUILTIN_MODIFIERS = ['public', 'view', 'payable', 'external', 'internal', 'pure', 'constant'];
        if (!_.includes(BUILTIN_MODIFIERS, ast.name)) {
            this._modifiersStatementIds.push(this._entryId);
            this._visitStatement(ast);
        }
    };
    ASTVisitor.prototype._visitBinaryBranch = function (ast, left, right, type) {
        this._branchMap[this._entryId++] = {
            line: this._getExpressionRange(ast).start.line,
            type: type,
            locations: [this._getExpressionRange(left), this._getExpressionRange(right)],
        };
    };
    ASTVisitor.prototype._visitStatement = function (ast) {
        this._statementMap[this._entryId++] = this._getExpressionRange(ast);
    };
    ASTVisitor.prototype._getExpressionRange = function (ast) {
        var start = this._locationByOffset[ast.range[0]];
        var end = this._locationByOffset[ast.range[1] + 1];
        var range = {
            start: start,
            end: end,
        };
        return range;
    };
    ASTVisitor.prototype._visitFunctionLikeDefinition = function (ast) {
        var loc = this._getExpressionRange(ast);
        this._fnMap[this._entryId++] = {
            name: ast.name,
            line: loc.start.line,
            loc: loc,
        };
        this._visitStatement(ast);
    };
    return ASTVisitor;
}());
exports.ASTVisitor = ASTVisitor;
//# sourceMappingURL=ast_visitor.js.map