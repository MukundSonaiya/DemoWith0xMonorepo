export declare const orderSchema: {
    id: string;
    properties: {
        makerAddress: {
            $ref: string;
        };
        takerAddress: {
            $ref: string;
        };
        makerFee: {
            $ref: string;
        };
        takerFee: {
            $ref: string;
        };
        senderAddress: {
            $ref: string;
        };
        makerAssetAmount: {
            $ref: string;
        };
        takerAssetAmount: {
            $ref: string;
        };
        makerAssetData: {
            $ref: string;
        };
        takerAssetData: {
            $ref: string;
        };
        salt: {
            $ref: string;
        };
        exchangeAddress: {
            $ref: string;
        };
        feeRecipientAddress: {
            $ref: string;
        };
        expirationTimeSeconds: {
            $ref: string;
        };
    };
    required: string[];
    type: string;
};
export declare const signedOrderSchema: {
    id: string;
    allOf: ({
        $ref: string;
        properties?: undefined;
        required?: undefined;
    } | {
        properties: {
            signature: {
                $ref: string;
            };
        };
        required: string[];
        $ref?: undefined;
    })[];
};
