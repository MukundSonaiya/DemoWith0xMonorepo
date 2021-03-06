"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("@0xproject/utils");
var chai = require("chai");
require("make-promises-safe");
require("mocha");
var utils_2 = require("../src/utils");
var expect = chai.expect;
describe('Utils tests', function () {
    describe('#formatABIDataItem', function () {
        it('correctly handles arrays', function () {
            var calls = [];
            var abi = {
                name: 'values',
                type: 'uint256[]',
            };
            var val = [1, 2, 3];
            var formatted = utils_2.formatABIDataItem(abi, val, function (type, value) {
                calls.push({ type: type, value: value });
                return value; // no-op
            });
            expect(formatted).to.be.deep.equal(val);
            expect(calls).to.be.deep.equal([
                { type: 'uint256', value: 1 },
                { type: 'uint256', value: 2 },
                { type: 'uint256', value: 3 },
            ]);
        });
        it('correctly handles tuples', function () {
            var calls = [];
            var abi = {
                components: [
                    {
                        name: 'to',
                        type: 'address',
                    },
                    {
                        name: 'amount',
                        type: 'uint256',
                    },
                ],
                name: 'data',
                type: 'tuple',
            };
            var ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
            var val = { to: ZERO_ADDRESS, amount: new utils_1.BigNumber(1) };
            var formatted = utils_2.formatABIDataItem(abi, val, function (type, value) {
                calls.push({ type: type, value: value });
                return value; // no-op
            });
            expect(formatted).to.be.deep.equal(val);
            expect(calls).to.be.deep.equal([
                {
                    type: 'address',
                    value: val.to,
                },
                {
                    type: 'uint256',
                    value: val.amount,
                },
            ]);
        });
        it('correctly handles nested arrays of tuples', function () {
            var calls = [];
            var abi = {
                components: [
                    {
                        name: 'to',
                        type: 'address',
                    },
                    {
                        name: 'amount',
                        type: 'uint256',
                    },
                ],
                name: 'data',
                type: 'tuple[2][]',
            };
            var ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
            var val = [
                [{ to: ZERO_ADDRESS, amount: new utils_1.BigNumber(1) }, { to: ZERO_ADDRESS, amount: new utils_1.BigNumber(2) }],
            ];
            var formatted = utils_2.formatABIDataItem(abi, val, function (type, value) {
                calls.push({ type: type, value: value });
                return value; // no-op
            });
            expect(formatted).to.be.deep.equal(val);
            expect(calls).to.be.deep.equal([
                {
                    type: 'address',
                    value: val[0][0].to,
                },
                {
                    type: 'uint256',
                    value: val[0][0].amount,
                },
                {
                    type: 'address',
                    value: val[0][1].to,
                },
                {
                    type: 'uint256',
                    value: val[0][1].amount,
                },
            ]);
        });
    });
});
//# sourceMappingURL=utils_test.js.map