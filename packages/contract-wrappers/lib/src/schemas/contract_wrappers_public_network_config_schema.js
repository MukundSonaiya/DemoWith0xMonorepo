"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var networkNameToId = {
    mainnet: 1,
    ropsten: 3,
    rinkeby: 4,
    kovan: 42,
    ganache: 50,
};
exports.contractWrappersPublicNetworkConfigSchema = {
    id: '/ZeroExContractPublicNetworkConfig',
    properties: {
        networkId: {
            type: 'number',
            enum: [
                networkNameToId.mainnet,
                networkNameToId.kovan,
                networkNameToId.ropsten,
                networkNameToId.rinkeby,
                networkNameToId.ganache,
            ],
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
    required: ['networkId'],
};
//# sourceMappingURL=contract_wrappers_public_network_config_schema.js.map