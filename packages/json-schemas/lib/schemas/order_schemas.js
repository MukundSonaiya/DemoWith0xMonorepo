"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderSchema = {
    id: '/Order',
    properties: {
        makerAddress: { $ref: '/Address' },
        takerAddress: { $ref: '/Address' },
        makerFee: { $ref: '/Number' },
        takerFee: { $ref: '/Number' },
        senderAddress: { $ref: '/Address' },
        makerAssetAmount: { $ref: '/Number' },
        takerAssetAmount: { $ref: '/Number' },
        makerAssetData: { $ref: '/Hex' },
        takerAssetData: { $ref: '/Hex' },
        salt: { $ref: '/Number' },
        exchangeAddress: { $ref: '/Address' },
        feeRecipientAddress: { $ref: '/Address' },
        expirationTimeSeconds: { $ref: '/Number' },
    },
    required: [
        'makerAddress',
        'takerAddress',
        'makerFee',
        'takerFee',
        'senderAddress',
        'makerAssetAmount',
        'takerAssetAmount',
        'makerAssetData',
        'takerAssetData',
        'salt',
        'exchangeAddress',
        'feeRecipientAddress',
        'expirationTimeSeconds',
    ],
    type: 'object',
};
exports.signedOrderSchema = {
    id: '/SignedOrder',
    allOf: [
        { $ref: '/Order' },
        {
            properties: {
                signature: { $ref: '/Hex' },
            },
            required: ['signature'],
        },
    ],
};
//# sourceMappingURL=order_schemas.js.map