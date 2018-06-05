"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("@0xproject/utils");
var ethereum_types_1 = require("ethereum-types");
var ethereumjs_util_1 = require("ethereumjs-util");
var _ = require("lodash");
function getAddressFromStackEntry(stackEntry) {
    var hexBase = 16;
    return utils_1.addressUtils.padZeros(new utils_1.BigNumber(ethereumjs_util_1.addHexPrefix(stackEntry)).toString(hexBase));
}
function getTracesByContractAddress(structLogs, startAddress) {
    var traceByContractAddress = {};
    var currentTraceSegment = [];
    var callStack = [startAddress];
    // tslint:disable-next-line:prefer-for-of
    for (var i = 0; i < structLogs.length; i++) {
        var structLog = structLogs[i];
        if (structLog.depth !== callStack.length - 1) {
            throw new Error("Malformed trace. Trace depth doesn't match call stack depth");
        }
        // After that check we have a guarantee that call stack is never empty
        // If it would: callStack.length - 1 === structLog.depth === -1
        // That means that we can always safely pop from it
        currentTraceSegment.push(structLog);
        var isCallLike = _.includes([ethereum_types_1.OpCode.CallCode, ethereum_types_1.OpCode.StaticCall, ethereum_types_1.OpCode.Call, ethereum_types_1.OpCode.DelegateCall], structLog.op);
        var isEndOpcode = _.includes([ethereum_types_1.OpCode.Return, ethereum_types_1.OpCode.Stop, ethereum_types_1.OpCode.Revert, ethereum_types_1.OpCode.Invalid, ethereum_types_1.OpCode.SelfDestruct], structLog.op);
        if (isCallLike) {
            var currentAddress = _.last(callStack);
            var jumpAddressOffset = 1;
            var newAddress = getAddressFromStackEntry(structLog.stack[structLog.stack.length - jumpAddressOffset - 1]);
            if (structLog === _.last(structLogs)) {
                throw new Error('Malformed trace. CALL-like opcode can not be the last one');
            }
            // Sometimes calls don't change the execution context (current address). When we do a transfer to an
            // externally owned account - it does the call and immediately returns because there is no fallback
            // function. We manually check if the call depth had changed to handle that case.
            var nextStructLog = structLogs[i + 1];
            if (nextStructLog.depth !== structLog.depth) {
                callStack.push(newAddress);
                traceByContractAddress[currentAddress] = (traceByContractAddress[currentAddress] || []).concat(currentTraceSegment);
                currentTraceSegment = [];
            }
        }
        else if (isEndOpcode) {
            var currentAddress = callStack.pop();
            traceByContractAddress[currentAddress] = (traceByContractAddress[currentAddress] || []).concat(currentTraceSegment);
            currentTraceSegment = [];
            if (structLog.op === ethereum_types_1.OpCode.SelfDestruct) {
                // After contract execution, we look at all sub-calls to external contracts, and for each one, fetch
                // the bytecode and compute the coverage for the call. If the contract is destroyed with a call
                // to `selfdestruct`, we are unable to fetch it's bytecode and compute coverage.
                // TODO: Refactor this logic to fetch the sub-called contract bytecode before the selfdestruct is called
                // in order to handle this edge-case.
                utils_1.logUtils.warn("Detected a selfdestruct. Sol-cov currently doesn't support that scenario. We'll just skip the trace part for a destructed contract");
            }
        }
        else if (structLog.op === ethereum_types_1.OpCode.Create) {
            // TODO: Extract the new contract address from the stack and handle that scenario
            utils_1.logUtils.warn("Detected a contract created from within another contract. Sol-cov currently doesn't support that scenario. We'll just skip that trace");
            return traceByContractAddress;
        }
        else {
            if (structLog !== _.last(structLogs)) {
                var nextStructLog = structLogs[i + 1];
                if (nextStructLog.depth === structLog.depth) {
                    continue;
                }
                else if (nextStructLog.depth === structLog.depth - 1) {
                    var currentAddress = callStack.pop();
                    traceByContractAddress[currentAddress] = (traceByContractAddress[currentAddress] || []).concat(currentTraceSegment);
                    currentTraceSegment = [];
                }
                else {
                    throw new Error('Malformed trace. Unexpected call depth change');
                }
            }
        }
    }
    if (callStack.length !== 0) {
        throw new Error('Malformed trace. Call stack non empty at the end');
    }
    if (currentTraceSegment.length !== 0) {
        throw new Error('Malformed trace. Current trace segment non empty at the end');
    }
    return traceByContractAddress;
}
exports.getTracesByContractAddress = getTracesByContractAddress;
//# sourceMappingURL=trace.js.map