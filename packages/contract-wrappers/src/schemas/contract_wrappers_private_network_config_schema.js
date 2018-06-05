"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contractWrappersPrivateNetworkConfigSchema = {
    id: '/ZeroExContractPrivateNetworkConfig',
    properties: {
        networkId: {
            type: 'number',
            minimum: 1,
        },
        gasPrice: { $ref: '/Number' },
        zrxContractAddress: { $ref: '/Address' },
        exchangeContractAddress: { $ref: '/Address' },
        tokenRegistryContractAddress: { $ref: '/Address' },
        tokenTransferProxyContractAddress: { $ref: '/Address' },
        orderWatcherConfig: {
            type: 'object',
            properties: {
                pollingIntervalMs: {
                    type: 'number',
                    minimum: 0,
                },
                numConfirmations: {
                    type: 'number',
                    minimum: 0,
                },
            },
        },
    },
    type: 'object',
    required: [
        'networkId',
        'zrxContractAddress',
        'exchangeContractAddress',
        'tokenRegistryContractAddress',
        'tokenTransferProxyContractAddress',
    ],
};
//# sourceMappingURL=contract_wrappers_private_network_config_schema.js.map