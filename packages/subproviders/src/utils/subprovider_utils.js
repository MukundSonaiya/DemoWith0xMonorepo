"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Prepends a subprovider to a provider
 * @param provider    Given provider
 * @param subprovider Subprovider to prepend
 */
function prependSubprovider(provider, subprovider) {
    subprovider.setEngine(provider);
    // HACK: We use implementation details of provider engine here
    // https://github.com/MetaMask/provider-engine/blob/master/index.js#L68
    provider._providers = [subprovider].concat(provider._providers);
}
exports.prependSubprovider = prependSubprovider;
//# sourceMappingURL=subprovider_utils.js.map