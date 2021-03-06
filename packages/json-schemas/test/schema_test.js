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
var utils_1 = require("@0xproject/utils");
var chai = require("chai");
var dirtyChai = require("dirty-chai");
var forEach = require("lodash.foreach");
require("make-promises-safe");
require("mocha");
var index_1 = require("../src/index");
chai.config.includeStack = true;
chai.use(dirtyChai);
var expect = chai.expect;
var NULL_ADDRESS = '0x0000000000000000000000000000000000000000';
var numberSchema = index_1.schemas.numberSchema, addressSchema = index_1.schemas.addressSchema, hexSchema = index_1.schemas.hexSchema, orderCancellationRequestsSchema = index_1.schemas.orderCancellationRequestsSchema, orderFillOrKillRequestsSchema = index_1.schemas.orderFillOrKillRequestsSchema, orderFillRequestsSchema = index_1.schemas.orderFillRequestsSchema, orderHashSchema = index_1.schemas.orderHashSchema, orderSchema = index_1.schemas.orderSchema, signedOrderSchema = index_1.schemas.signedOrderSchema, signedOrdersSchema = index_1.schemas.signedOrdersSchema, blockParamSchema = index_1.schemas.blockParamSchema, blockRangeSchema = index_1.schemas.blockRangeSchema, tokenSchema = index_1.schemas.tokenSchema, jsNumber = index_1.schemas.jsNumber, txDataSchema = index_1.schemas.txDataSchema, relayerApiErrorResponseSchema = index_1.schemas.relayerApiErrorResponseSchema, relayerApiOrderBookResponseSchema = index_1.schemas.relayerApiOrderBookResponseSchema, relayerApiTokenPairsResponseSchema = index_1.schemas.relayerApiTokenPairsResponseSchema, relayerApiFeesPayloadSchema = index_1.schemas.relayerApiFeesPayloadSchema, relayerApiFeesResponseSchema = index_1.schemas.relayerApiFeesResponseSchema, relayerApiOrderbookChannelSubscribeSchema = index_1.schemas.relayerApiOrderbookChannelSubscribeSchema, relayerApiOrderbookChannelUpdateSchema = index_1.schemas.relayerApiOrderbookChannelUpdateSchema, relayerApiOrderbookChannelSnapshotSchema = index_1.schemas.relayerApiOrderbookChannelSnapshotSchema;
describe('Schema', function () {
    var validator = new index_1.SchemaValidator();
    var validateAgainstSchema = function (testCases, schema, shouldFail) {
        if (shouldFail === void 0) { shouldFail = false; }
        forEach(testCases, function (testCase) {
            var validationResult = validator.validate(testCase, schema);
            var hasErrors = validationResult.errors.length !== 0;
            if (shouldFail) {
                if (!hasErrors) {
                    throw new Error("Expected testCase: " + JSON.stringify(testCase, null, '\t') + " to fail and it didn't.");
                }
            }
            else {
                if (hasErrors) {
                    throw new Error(JSON.stringify(validationResult.errors, null, '\t'));
                }
            }
        });
    };
    describe('#numberSchema', function () {
        it('should validate valid numbers', function () {
            var testCases = ['42', '0', '1.3', '0.2', '00.00'];
            validateAgainstSchema(testCases, numberSchema);
        });
        it('should fail for invalid numbers', function () {
            var testCases = ['.3', '1.', 'abacaba', 'и', '1..0'];
            var shouldFail = true;
            validateAgainstSchema(testCases, numberSchema, shouldFail);
        });
    });
    describe('#addressSchema', function () {
        it('should validate valid addresses', function () {
            var testCases = ['0x8b0292b11a196601ed2ce54b665cafeca0347d42', NULL_ADDRESS];
            validateAgainstSchema(testCases, addressSchema);
        });
        it('should fail for invalid addresses', function () {
            var testCases = [
                '0x',
                '0',
                '0x00',
                '0xzzzzzzB11a196601eD2ce54B665CaFEca0347D42',
                '0x8b0292B11a196601eD2ce54B665CaFEca0347D42',
            ];
            var shouldFail = true;
            validateAgainstSchema(testCases, addressSchema, shouldFail);
        });
    });
    describe('#hexSchema', function () {
        it('should validate valid hex string', function () {
            var testCases = ['0x8b0292b11a196601ed2ce54b665cafeca0347d42', NULL_ADDRESS];
            validateAgainstSchema(testCases, hexSchema);
        });
        it('should fail for invalid hex string', function () {
            var testCases = ['0x', '0', '0xzzzzzzB11a196601eD2ce54B665CaFEca0347D42'];
            var shouldFail = true;
            validateAgainstSchema(testCases, hexSchema, shouldFail);
        });
    });
    describe('#orderHashSchema', function () {
        it('should validate valid order hash', function () {
            var testCases = [
                '0x61a3ed31B43c8780e905a260a35faefEc527be7516aa11c0256729b5b351bc33',
                '0x40349190569279751135161d22529dc25add4f6069af05be04cacbda2ace2254',
            ];
            validateAgainstSchema(testCases, orderHashSchema);
        });
        it('should fail for invalid order hash', function () {
            var testCases = [
                {},
                '0x',
                '0x8b0292B11a196601eD2ce54B665CaFEca0347D42',
                '61a3ed31B43c8780e905a260a35faefEc527be7516aa11c0256729b5b351bc33',
            ];
            var shouldFail = true;
            validateAgainstSchema(testCases, orderHashSchema, shouldFail);
        });
    });
    describe('#blockParamSchema', function () {
        it('should validate valid block param', function () {
            var blockNumber = 42;
            var testCases = [blockNumber, 'latest', 'pending', 'earliest'];
            validateAgainstSchema(testCases, blockParamSchema);
        });
        it('should fail for invalid block param', function () {
            var testCases = [{}, '42', 'pemding'];
            var shouldFail = true;
            validateAgainstSchema(testCases, blockParamSchema, shouldFail);
        });
    });
    describe('#blockRangeSchema', function () {
        it('should validate valid subscription opts', function () {
            var testCases = [{ fromBlock: 42, toBlock: 'latest' }, { fromBlock: 42 }, {}];
            validateAgainstSchema(testCases, blockRangeSchema);
        });
        it('should fail for invalid subscription opts', function () {
            var testCases = [{ fromBlock: '42' }];
            var shouldFail = true;
            validateAgainstSchema(testCases, blockRangeSchema, shouldFail);
        });
    });
    describe('#tokenSchema', function () {
        var token = {
            name: 'Zero Ex',
            symbol: 'ZRX',
            decimals: 100500,
            address: '0x8b0292b11a196601ed2ce54b665cafeca0347d42',
            url: 'https://0xproject.com',
        };
        it('should validate valid token', function () {
            var testCases = [token];
            validateAgainstSchema(testCases, tokenSchema);
        });
        it('should fail for invalid token', function () {
            var num = 4;
            var testCases = [
                __assign({}, token, { address: null }),
                __assign({}, token, { decimals: undefined }),
                [],
                num,
            ];
            var shouldFail = true;
            validateAgainstSchema(testCases, tokenSchema, shouldFail);
        });
    });
    describe('order including schemas', function () {
        var order = {
            makerAddress: NULL_ADDRESS,
            takerAddress: NULL_ADDRESS,
            senderAddress: NULL_ADDRESS,
            makerFee: '1',
            takerFee: '2',
            makerAssetAmount: '1',
            takerAssetAmount: '2',
            makerAssetData: NULL_ADDRESS,
            takerAssetData: NULL_ADDRESS,
            salt: '67006738228878699843088602623665307406148487219438534730168799356281242528500',
            feeRecipientAddress: NULL_ADDRESS,
            exchangeAddress: NULL_ADDRESS,
            expirationTimeSeconds: '42',
        };
        describe('#orderSchema', function () {
            it('should validate valid order', function () {
                var testCases = [order];
                validateAgainstSchema(testCases, orderSchema);
            });
            it('should fail for invalid order', function () {
                var testCases = [
                    __assign({}, order, { salt: undefined }),
                    __assign({}, order, { salt: 'salt' }),
                    'order',
                ];
                var shouldFail = true;
                validateAgainstSchema(testCases, orderSchema, shouldFail);
            });
        });
        describe('signed order including schemas', function () {
            var signedOrder = __assign({}, order, { signature: '0x031b61a3ed31b43c8780e905a260a35faefcc527be7516aa11c0256729b5b351bc3340349190569279751135161d22529dc25add4f6069af05be04cacbda2ace2254' });
            describe('#signedOrdersSchema', function () {
                it('should validate valid signed orders', function () {
                    var testCases = [[signedOrder], []];
                    validateAgainstSchema(testCases, signedOrdersSchema);
                });
                it('should fail for invalid signed orders', function () {
                    var testCases = [[signedOrder, 1]];
                    var shouldFail = true;
                    validateAgainstSchema(testCases, signedOrdersSchema, shouldFail);
                });
            });
            describe('#signedOrderSchema', function () {
                it('should validate valid signed order', function () {
                    var testCases = [signedOrder];
                    validateAgainstSchema(testCases, signedOrderSchema);
                });
                it('should fail for invalid signed order', function () {
                    var testCases = [
                        __assign({}, signedOrder, { signature: undefined }),
                    ];
                    var shouldFail = true;
                    validateAgainstSchema(testCases, signedOrderSchema, shouldFail);
                });
            });
            describe('#orderFillOrKillRequestsSchema', function () {
                var orderFillOrKillRequests = [
                    {
                        signedOrder: signedOrder,
                        fillTakerAmount: '5',
                    },
                ];
                it('should validate valid order fill or kill requests', function () {
                    var testCases = [orderFillOrKillRequests];
                    validateAgainstSchema(testCases, orderFillOrKillRequestsSchema);
                });
                it('should fail for invalid order fill or kill requests', function () {
                    var testCases = [
                        [
                            __assign({}, orderFillOrKillRequests[0], { fillTakerAmount: undefined }),
                        ],
                    ];
                    var shouldFail = true;
                    validateAgainstSchema(testCases, orderFillOrKillRequestsSchema, shouldFail);
                });
            });
            describe('#orderCancellationRequestsSchema', function () {
                var orderCancellationRequests = [
                    {
                        order: order,
                        takerTokenCancelAmount: '5',
                    },
                ];
                it('should validate valid order cancellation requests', function () {
                    var testCases = [orderCancellationRequests];
                    validateAgainstSchema(testCases, orderCancellationRequestsSchema);
                });
                it('should fail for invalid order cancellation requests', function () {
                    var testCases = [
                        [
                            __assign({}, orderCancellationRequests[0], { takerTokenCancelAmount: undefined }),
                        ],
                    ];
                    var shouldFail = true;
                    validateAgainstSchema(testCases, orderCancellationRequestsSchema, shouldFail);
                });
            });
            describe('#orderFillRequestsSchema', function () {
                var orderFillRequests = [
                    {
                        signedOrder: signedOrder,
                        takerTokenFillAmount: '5',
                    },
                ];
                it('should validate valid order fill requests', function () {
                    var testCases = [orderFillRequests];
                    validateAgainstSchema(testCases, orderFillRequestsSchema);
                });
                it('should fail for invalid order fill requests', function () {
                    var testCases = [
                        [
                            __assign({}, orderFillRequests[0], { takerTokenFillAmount: undefined }),
                        ],
                    ];
                    var shouldFail = true;
                    validateAgainstSchema(testCases, orderFillRequestsSchema, shouldFail);
                });
            });
            describe('#relayerApiOrderBookResponseSchema', function () {
                it('should validate valid order book responses', function () {
                    var testCases = [
                        {
                            bids: [],
                            asks: [],
                        },
                        {
                            bids: [signedOrder, signedOrder],
                            asks: [],
                        },
                        {
                            bids: [],
                            asks: [signedOrder, signedOrder],
                        },
                        {
                            bids: [signedOrder],
                            asks: [signedOrder, signedOrder],
                        },
                    ];
                    validateAgainstSchema(testCases, relayerApiOrderBookResponseSchema);
                });
                it('should fail for invalid order fill requests', function () {
                    var testCases = [
                        {},
                        {
                            bids: [signedOrder, signedOrder],
                        },
                        {
                            asks: [signedOrder, signedOrder],
                        },
                        {
                            bids: signedOrder,
                            asks: [signedOrder, signedOrder],
                        },
                        {
                            bids: [signedOrder],
                            asks: signedOrder,
                        },
                    ];
                    var shouldFail = true;
                    validateAgainstSchema(testCases, relayerApiOrderBookResponseSchema, shouldFail);
                });
            });
            describe('#relayerApiOrderbookChannelSubscribeSchema', function () {
                it('should validate valid orderbook channel websocket subscribe message', function () {
                    var testCases = [
                        {
                            type: 'subscribe',
                            channel: 'orderbook',
                            requestId: 1,
                            payload: {
                                baseTokenAddress: '0x323b5d4c32345ced77393b3530b1eed0f346429d',
                                quoteTokenAddress: '0x323b5d4c32345ced77393b3530b1eed0f346429d',
                                snapshot: true,
                                limit: 100,
                            },
                        },
                        {
                            type: 'subscribe',
                            channel: 'orderbook',
                            requestId: 1,
                            payload: {
                                baseTokenAddress: '0x323b5d4c32345ced77393b3530b1eed0f346429d',
                                quoteTokenAddress: '0x323b5d4c32345ced77393b3530b1eed0f346429d',
                            },
                        },
                    ];
                    validateAgainstSchema(testCases, relayerApiOrderbookChannelSubscribeSchema);
                });
                it('should fail for invalid orderbook channel websocket subscribe message', function () {
                    var checksummedAddress = '0xA2b31daCf30a9C50ca473337c01d8A201ae33e32';
                    var testCases = [
                        {
                            type: 'subscribe',
                            channel: 'orderbook',
                            payload: {
                                baseTokenAddress: '0x323b5d4c32345ced77393b3530b1eed0f346429d',
                                quoteTokenAddress: '0x323b5d4c32345ced77393b3530b1eed0f346429d',
                                snapshot: true,
                                limit: 100,
                            },
                        },
                        {
                            type: 'foo',
                            channel: 'orderbook',
                            requestId: 1,
                            payload: {
                                baseTokenAddress: '0x323b5d4c32345ced77393b3530b1eed0f346429d',
                                quoteTokenAddress: '0x323b5d4c32345ced77393b3530b1eed0f346429d',
                            },
                        },
                        {
                            type: 'subscribe',
                            channel: 'bar',
                            requestId: 1,
                            payload: {
                                baseTokenAddress: '0x323b5d4c32345ced77393b3530b1eed0f346429d',
                                quoteTokenAddress: '0x323b5d4c32345ced77393b3530b1eed0f346429d',
                            },
                        },
                        {
                            type: 'subscribe',
                            channel: 'orderbook',
                            requestId: 1,
                            payload: {
                                baseTokenAddress: checksummedAddress,
                                quoteTokenAddress: '0x323b5d4c32345ced77393b3530b1eed0f346429d',
                            },
                        },
                        {
                            type: 'subscribe',
                            channel: 'orderbook',
                            requestId: 1,
                            payload: {
                                baseTokenAddress: '0x323b5d4c32345ced77393b3530b1eed0f346429d',
                                quoteTokenAddress: checksummedAddress,
                            },
                        },
                        {
                            type: 'subscribe',
                            channel: 'orderbook',
                            requestId: 1,
                            payload: {
                                quoteTokenAddress: '0x323b5d4c32345ced77393b3530b1eed0f346429d',
                            },
                        },
                        {
                            type: 'subscribe',
                            channel: 'orderbook',
                            requestId: 1,
                            payload: {
                                baseTokenAddress: '0x323b5d4c32345ced77393b3530b1eed0f346429d',
                            },
                        },
                        {
                            type: 'subscribe',
                            channel: 'orderbook',
                            requestId: 1,
                            payload: {
                                baseTokenAddress: '0x323b5d4c32345ced77393b3530b1eed0f346429d',
                                quoteTokenAddress: '0x323b5d4c32345ced77393b3530b1eed0f346429d',
                                snapshot: 'true',
                                limit: 100,
                            },
                        },
                        {
                            type: 'subscribe',
                            channel: 'orderbook',
                            requestId: 1,
                            payload: {
                                baseTokenAddress: '0x323b5d4c32345ced77393b3530b1eed0f346429d',
                                quoteTokenAddress: '0x323b5d4c32345ced77393b3530b1eed0f346429d',
                                snapshot: true,
                                limit: '100',
                            },
                        },
                    ];
                    var shouldFail = true;
                    validateAgainstSchema(testCases, relayerApiOrderbookChannelSubscribeSchema, shouldFail);
                });
            });
            describe('#relayerApiOrderbookChannelSnapshotSchema', function () {
                it('should validate valid orderbook channel websocket snapshot message', function () {
                    var testCases = [
                        {
                            type: 'snapshot',
                            channel: 'orderbook',
                            requestId: 2,
                            payload: {
                                bids: [],
                                asks: [],
                            },
                        },
                        {
                            type: 'snapshot',
                            channel: 'orderbook',
                            requestId: 2,
                            payload: {
                                bids: [signedOrder],
                                asks: [signedOrder],
                            },
                        },
                    ];
                    validateAgainstSchema(testCases, relayerApiOrderbookChannelSnapshotSchema);
                });
                it('should fail for invalid orderbook channel websocket snapshot message', function () {
                    var testCases = [
                        {
                            type: 'foo',
                            channel: 'orderbook',
                            requestId: 2,
                            payload: {
                                bids: [signedOrder],
                                asks: [signedOrder],
                            },
                        },
                        {
                            type: 'snapshot',
                            channel: 'bar',
                            requestId: 2,
                            payload: {
                                bids: [signedOrder],
                                asks: [signedOrder],
                            },
                        },
                        {
                            type: 'snapshot',
                            channel: 'orderbook',
                            payload: {
                                bids: [signedOrder],
                                asks: [signedOrder],
                            },
                        },
                        {
                            type: 'snapshot',
                            channel: 'orderbook',
                            requestId: '2',
                            payload: {
                                bids: [signedOrder],
                                asks: [signedOrder],
                            },
                        },
                        {
                            type: 'snapshot',
                            channel: 'orderbook',
                            requestId: 2,
                            payload: {
                                bids: [signedOrder],
                            },
                        },
                        {
                            type: 'snapshot',
                            channel: 'orderbook',
                            requestId: 2,
                            payload: {
                                asks: [signedOrder],
                            },
                        },
                        {
                            type: 'snapshot',
                            channel: 'orderbook',
                            requestId: 2,
                            payload: {
                                bids: [signedOrder],
                                asks: [{}],
                            },
                        },
                        {
                            type: 'snapshot',
                            channel: 'orderbook',
                            requestId: 2,
                            payload: {
                                bids: [{}],
                                asks: [signedOrder],
                            },
                        },
                    ];
                    var shouldFail = true;
                    validateAgainstSchema(testCases, relayerApiOrderbookChannelSnapshotSchema, shouldFail);
                });
            });
            describe('#relayerApiOrderbookChannelUpdateSchema', function () {
                it('should validate valid orderbook channel websocket update message', function () {
                    var testCases = [
                        {
                            type: 'update',
                            channel: 'orderbook',
                            requestId: 2,
                            payload: signedOrder,
                        },
                    ];
                    validateAgainstSchema(testCases, relayerApiOrderbookChannelUpdateSchema);
                });
                it('should fail for invalid orderbook channel websocket update message', function () {
                    var testCases = [
                        {
                            type: 'foo',
                            channel: 'orderbook',
                            requestId: 2,
                            payload: signedOrder,
                        },
                        {
                            type: 'update',
                            channel: 'bar',
                            requestId: 2,
                            payload: signedOrder,
                        },
                        {
                            type: 'update',
                            channel: 'orderbook',
                            requestId: 2,
                            payload: {},
                        },
                    ];
                    var shouldFail = true;
                    validateAgainstSchema(testCases, relayerApiOrderbookChannelUpdateSchema, shouldFail);
                });
            });
        });
    });
    describe('BigNumber serialization', function () {
        it('should correctly serialize BigNumbers', function () {
            var testCases = {
                '42': '42',
                '0': '0',
                '1.3': '1.3',
                '0.2': '0.2',
                '00.00': '0',
                '.3': '0.3',
            };
            forEach(testCases, function (serialized, input) {
                expect(JSON.parse(JSON.stringify(new utils_1.BigNumber(input)))).to.be.equal(serialized);
            });
        });
    });
    describe('#relayerApiErrorResponseSchema', function () {
        it('should validate valid errorResponse', function () {
            var testCases = [
                {
                    code: 102,
                    reason: 'Order submission disabled',
                },
                {
                    code: 101,
                    reason: 'Validation failed',
                    validationErrors: [
                        {
                            field: 'maker',
                            code: 1002,
                            reason: 'Invalid address',
                        },
                    ],
                },
            ];
            validateAgainstSchema(testCases, relayerApiErrorResponseSchema);
        });
        it('should fail for invalid error responses', function () {
            var testCases = [
                {},
                {
                    code: 102,
                },
                {
                    code: '102',
                    reason: 'Order submission disabled',
                },
                {
                    reason: 'Order submission disabled',
                },
                {
                    code: 101,
                    reason: 'Validation failed',
                    validationErrors: [
                        {
                            field: 'maker',
                            reason: 'Invalid address',
                        },
                    ],
                },
                {
                    code: 101,
                    reason: 'Validation failed',
                    validationErrors: [
                        {
                            field: 'maker',
                            code: '1002',
                            reason: 'Invalid address',
                        },
                    ],
                },
            ];
            var shouldFail = true;
            validateAgainstSchema(testCases, relayerApiErrorResponseSchema, shouldFail);
        });
    });
    describe('#relayerApiFeesPayloadSchema', function () {
        it('should validate valid fees payloads', function () {
            var testCases = [
                {
                    exchangeContractAddress: '0x323b5d4c32345ced77393b3530b1eed0f346429d',
                    maker: '0x323b5d4c32345ced77393b3530b1eed0f346429d',
                    taker: '0x323b5d4c32345ced77393b3530b1eed0f346429d',
                    makerTokenAddress: '0x323b5d4c32345ced77393b3530b1eed0f346429d',
                    takerTokenAddress: '0xef7fff64389b814a946f3e92105513705ca6b990',
                    makerTokenAmount: '10000000000000000000',
                    takerTokenAmount: '30000000000000000000',
                    expirationUnixTimestampSec: '42',
                    salt: '67006738228878699843088602623665307406148487219438534730168799356281242528500',
                },
            ];
            validateAgainstSchema(testCases, relayerApiFeesPayloadSchema);
        });
        it('should fail for invalid fees payloads', function () {
            var checksummedAddress = '0xA2b31daCf30a9C50ca473337c01d8A201ae33e32';
            var testCases = [
                {},
                {
                    takerTokenAddress: '0xef7fff64389b814a946f3e92105513705ca6b990',
                    makerTokenAmount: '10000000000000000000',
                    takerTokenAmount: '30000000000000000000',
                },
                {
                    taker: checksummedAddress,
                    makerTokenAddress: '0x323b5d4c32345ced77393b3530b1eed0f346429d',
                    takerTokenAddress: '0xef7fff64389b814a946f3e92105513705ca6b990',
                    makerTokenAmount: '10000000000000000000',
                    takerTokenAmount: '30000000000000000000',
                },
                {
                    makerTokenAddress: '0x323b5d4c32345ced77393b3530b1eed0f346429d',
                    takerTokenAddress: '0xef7fff64389b814a946f3e92105513705ca6b990',
                    makerTokenAmount: 10000000000000000000,
                    takerTokenAmount: 30000000000000000000,
                },
            ];
            var shouldFail = true;
            validateAgainstSchema(testCases, relayerApiFeesPayloadSchema, shouldFail);
        });
    });
    describe('#relayerApiFeesResponseSchema', function () {
        it('should validate valid fees responses', function () {
            var testCases = [
                {
                    makerFee: '10000000000000000',
                    takerFee: '30000000000000000',
                    feeRecipient: '0x323b5d4c32345ced77393b3530b1eed0f346429d',
                },
            ];
            validateAgainstSchema(testCases, relayerApiFeesResponseSchema);
        });
        it('should fail for invalid fees responses', function () {
            var checksummedAddress = '0xA2b31daCf30a9C50ca473337c01d8A201ae33e32';
            var testCases = [
                {},
                {
                    makerFee: 10000000000000000,
                    takerFee: 30000000000000000,
                },
                {
                    feeRecipient: checksummedAddress,
                    takerToSpecify: checksummedAddress,
                    makerFee: '10000000000000000',
                    takerFee: '30000000000000000',
                },
            ];
            var shouldFail = true;
            validateAgainstSchema(testCases, relayerApiFeesResponseSchema, shouldFail);
        });
    });
    describe('#relayerApiTokenPairsResponseSchema', function () {
        it('should validate valid tokenPairs response', function () {
            var testCases = [
                [],
                [
                    {
                        tokenA: {
                            address: '0x323b5d4c32345ced77393b3530b1eed0f346429d',
                            minAmount: '0',
                            maxAmount: '10000000000000000000',
                            precision: 5,
                        },
                        tokenB: {
                            address: '0xef7fff64389b814a946f3e92105513705ca6b990',
                            minAmount: '0',
                            maxAmount: '50000000000000000000',
                            precision: 5,
                        },
                    },
                ],
                [
                    {
                        tokenA: {
                            address: '0x323b5d4c32345ced77393b3530b1eed0f346429d',
                        },
                        tokenB: {
                            address: '0xef7fff64389b814a946f3e92105513705ca6b990',
                        },
                    },
                ],
            ];
            validateAgainstSchema(testCases, relayerApiTokenPairsResponseSchema);
        });
        it('should fail for invalid tokenPairs responses', function () {
            var checksummedAddress = '0xA2b31daCf30a9C50ca473337c01d8A201ae33e32';
            var testCases = [
                [
                    {
                        tokenA: {
                            address: checksummedAddress,
                        },
                        tokenB: {
                            address: checksummedAddress,
                        },
                    },
                ],
                [
                    {
                        tokenA: {
                            address: '0x323b5d4c32345ced77393b3530b1eed0f346429d',
                            minAmount: 0,
                            maxAmount: 10000000000000000000,
                        },
                        tokenB: {
                            address: '0xef7fff64389b814a946f3e92105513705ca6b990',
                            minAmount: 0,
                            maxAmount: 50000000000000000000,
                        },
                    },
                ],
                [
                    {
                        tokenA: {
                            address: '0x323b5d4c32345ced77393b3530b1eed0f346429d',
                            precision: '5',
                        },
                        tokenB: {
                            address: '0xef7fff64389b814a946f3e92105513705ca6b990',
                            precision: '5',
                        },
                    },
                ],
            ];
            var shouldFail = true;
            validateAgainstSchema(testCases, relayerApiTokenPairsResponseSchema, shouldFail);
        });
    });
    describe('#jsNumberSchema', function () {
        it('should validate valid js number', function () {
            // tslint:disable-next-line:custom-no-magic-numbers
            var testCases = [1, 42];
            validateAgainstSchema(testCases, jsNumber);
        });
        it('should fail for invalid js number', function () {
            // tslint:disable-next-line:custom-no-magic-numbers
            var testCases = [NaN, -1, new utils_1.BigNumber(1)];
            var shouldFail = true;
            validateAgainstSchema(testCases, jsNumber, shouldFail);
        });
    });
    describe('#txDataSchema', function () {
        it('should validate valid txData', function () {
            var bigNumGasAmount = new utils_1.BigNumber(42);
            var testCases = [
                {
                    from: NULL_ADDRESS,
                },
                {
                    from: NULL_ADDRESS,
                    gas: bigNumGasAmount,
                },
                {
                    from: NULL_ADDRESS,
                    gas: 42,
                },
            ];
            validateAgainstSchema(testCases, txDataSchema);
        });
        it('should fail for invalid txData', function () {
            var testCases = [
                {
                    gas: new utils_1.BigNumber(42),
                },
                {
                    from: NULL_ADDRESS,
                    unknownProp: 'here',
                },
                {},
                [],
                new utils_1.BigNumber(1),
            ];
            var shouldFail = true;
            validateAgainstSchema(testCases, txDataSchema, shouldFail);
        });
    });
}); // tslint:disable:max-file-line-count
//# sourceMappingURL=schema_test.js.map