"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai = require("chai");
var _ = require("lodash");
var expect = chai.expect;
exports.callbackErrorReporter = {
    reportNoErrorCallbackErrors: function (done, expectToBeCalledOnce) {
        if (expectToBeCalledOnce === void 0) { expectToBeCalledOnce = true; }
        var callback = function (f) {
            var wrapped = function (value) {
                if (_.isUndefined(f)) {
                    done();
                    return;
                }
                try {
                    f(value);
                    if (expectToBeCalledOnce) {
                        done();
                    }
                }
                catch (err) {
                    done(err);
                }
            };
            return wrapped;
        };
        return callback;
    },
    reportNodeCallbackErrors: function (done, expectToBeCalledOnce) {
        if (expectToBeCalledOnce === void 0) { expectToBeCalledOnce = true; }
        var callback = function (f) {
            var wrapped = function (error, value) {
                if (!_.isNull(error)) {
                    done(error);
                }
                else {
                    if (_.isUndefined(f)) {
                        done();
                        return;
                    }
                    try {
                        f(value);
                        if (expectToBeCalledOnce) {
                            done();
                        }
                    }
                    catch (err) {
                        done(err);
                    }
                }
            };
            return wrapped;
        };
        return callback;
    },
    assertNodeCallbackError: function (done, errMsg) {
        var wrapped = function (error, value) {
            if (_.isNull(error)) {
                done(new Error('Expected callback to receive an error'));
            }
            else {
                try {
                    expect(error.message).to.be.equal(errMsg);
                    done();
                }
                catch (err) {
                    done(err);
                }
            }
        };
        return wrapped;
    },
};
//# sourceMappingURL=callback_error_reporter.js.map