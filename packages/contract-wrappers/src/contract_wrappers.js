"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var web3_wrapper_1 = require("@0xproject/web3-wrapper");
var _ = require("lodash");
var artifacts_1 = require("./artifacts");
var ether_token_wrapper_1 = require("./contract_wrappers/ether_token_wrapper");
var exchange_wrapper_1 = require("./contract_wrappers/exchange_wrapper");
var token_registry_wrapper_1 = require("./contract_wrappers/token_registry_wrapper");
var token_transfer_proxy_wrapper_1 = require("./contract_wrappers/token_transfer_proxy_wrapper");
var token_wrapper_1 = require("./contract_wrappers/token_wrapper");
var contract_wrappers_config_schema_1 = require("./schemas/contract_wrappers_config_schema");
var contract_wrappers_private_network_config_schema_1 = require("./schemas/contract_wrappers_private_network_config_schema");
var contract_wrappers_public_network_config_schema_1 = require("./schemas/contract_wrappers_public_network_config_schema");
var assert_1 = require("./utils/assert");
/**
 * The ContractWrappers class contains smart contract wrappers helpful when building on 0x protocol.
 */
var ContractWrappers = /** @class */ (function () {
    /**
     * Instantiates a new ContractWrappers instance.
     * @param   provider    The Provider instance you would like the 0x.js library to use for interacting with
     *                      the Ethereum network.
     * @param   config      The configuration object. Look up the type for the description.
     * @return  An instance of the ContractWrappers class.
     */
    function ContractWrappers(provider, config) {
        var _this = this;
        assert_1.assert.isWeb3Provider('provider', provider);
        assert_1.assert.doesConformToSchema('config', config, contract_wrappers_config_schema_1.ContractWrappersConfigSchema, [
            contract_wrappers_private_network_config_schema_1.contractWrappersPrivateNetworkConfigSchema,
            contract_wrappers_public_network_config_schema_1.contractWrappersPublicNetworkConfigSchema,
        ]);
        var artifactJSONs = _.values(artifacts_1.artifacts);
        var abiArrays = _.map(artifactJSONs, function (artifact) { return artifact.abi; });
        var txDefaults = {
            gasPrice: config.gasPrice,
        };
        this._web3Wrapper = new web3_wrapper_1.Web3Wrapper(provider, txDefaults);
        _.forEach(abiArrays, function (abi) {
            _this._web3Wrapper.abiDecoder.addABI(abi);
        });
        this.proxy = new token_transfer_proxy_wrapper_1.TokenTransferProxyWrapper(this._web3Wrapper, config.networkId, config.tokenTransferProxyContractAddress);
        this.token = new token_wrapper_1.TokenWrapper(this._web3Wrapper, config.networkId, this.proxy);
        this.exchange = new exchange_wrapper_1.ExchangeWrapper(this._web3Wrapper, config.networkId, this.token, config.exchangeContractAddress, config.zrxContractAddress);
        this.tokenRegistry = new token_registry_wrapper_1.TokenRegistryWrapper(this._web3Wrapper, config.networkId, config.tokenRegistryContractAddress);
        this.etherToken = new ether_token_wrapper_1.EtherTokenWrapper(this._web3Wrapper, config.networkId, this.token);
    }
    /**
     * Sets a new web3 provider for 0x.js. Updating the provider will stop all
     * subscriptions so you will need to re-subscribe to all events relevant to your app after this call.
     * @param   provider    The Web3Provider you would like the 0x.js library to use from now on.
     * @param   networkId   The id of the network your provider is connected to
     */
    ContractWrappers.prototype.setProvider = function (provider, networkId) {
        this._web3Wrapper.setProvider(provider);
        this.exchange._invalidateContractInstances();
        this.exchange._setNetworkId(networkId);
        this.tokenRegistry._invalidateContractInstance();
        this.tokenRegistry._setNetworkId(networkId);
        this.token._invalidateContractInstances();
        this.token._setNetworkId(networkId);
        this.proxy._invalidateContractInstance();
        this.proxy._setNetworkId(networkId);
        this.etherToken._invalidateContractInstance();
        this.etherToken._setNetworkId(networkId);
    };
    /**
     * Get the provider instance currently used by 0x.js
     * @return  Web3 provider instance
     */
    ContractWrappers.prototype.getProvider = function () {
        return this._web3Wrapper.getProvider();
    };
    return ContractWrappers;
}());
exports.ContractWrappers = ContractWrappers;
//# sourceMappingURL=contract_wrappers.js.map