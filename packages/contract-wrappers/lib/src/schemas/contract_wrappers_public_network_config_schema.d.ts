export declare const contractWrappersPublicNetworkConfigSchema: {
    id: string;
    properties: {
        networkId: {
            type: string;
            enum: number[];
        };
        gasPrice: {
            $ref: string;
        };
        zrxContractAddress: {
            $ref: string;
        };
        exchangeContractAddress: {
            $ref: string;
        };
        tokenRegistryContractAddress: {
            $ref: string;
        };
        tokenTransferProxyContractAddress: {
            $ref: string;
        };
        orderWatcherConfig: {
            type: string;
            properties: {
                pollingIntervalMs: {
                    type: string;
                    minimum: number;
                };
                numConfirmations: {
                    type: string;
                    minimum: number;
                };
            };
        };
    };
    type: string;
    required: string[];
};
