"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ethUtil = require("ethereumjs-util");
var DEFAULT_ADDRESS_SEARCH_LIMIT = 1000;
var DerivedHDKeyInfoIterator = /** @class */ (function () {
    function DerivedHDKeyInfoIterator(initialDerivedKey, searchLimit) {
        if (searchLimit === void 0) { searchLimit = DEFAULT_ADDRESS_SEARCH_LIMIT; }
        this._searchLimit = searchLimit;
        this._parentDerivedKeyInfo = initialDerivedKey;
        this._index = 0;
    }
    DerivedHDKeyInfoIterator.prototype.next = function () {
        var baseDerivationPath = this._parentDerivedKeyInfo.baseDerivationPath;
        var derivationIndex = this._index;
        var fullDerivationPath = "m/" + baseDerivationPath + "/" + derivationIndex;
        var path = "m/" + derivationIndex;
        var hdKey = this._parentDerivedKeyInfo.hdKey.derive(path);
        var address = exports.walletUtils.addressOfHDKey(hdKey);
        var derivedKey = {
            address: address,
            hdKey: hdKey,
            baseDerivationPath: baseDerivationPath,
            derivationPath: fullDerivationPath,
        };
        var isDone = this._index === this._searchLimit;
        this._index++;
        return {
            done: isDone,
            value: derivedKey,
        };
    };
    DerivedHDKeyInfoIterator.prototype[Symbol.iterator] = function () {
        return this;
    };
    return DerivedHDKeyInfoIterator;
}());
exports.walletUtils = {
    calculateDerivedHDKeyInfos: function (parentDerivedKeyInfo, numberOfKeys) {
        var derivedKeys = [];
        var derivedKeyIterator = new DerivedHDKeyInfoIterator(parentDerivedKeyInfo, numberOfKeys);
        for (var _i = 0, derivedKeyIterator_1 = derivedKeyIterator; _i < derivedKeyIterator_1.length; _i++) {
            var key = derivedKeyIterator_1[_i];
            derivedKeys.push(key);
        }
        return derivedKeys;
    },
    findDerivedKeyInfoForAddressIfExists: function (address, parentDerivedKeyInfo, searchLimit) {
        var matchedKey;
        var derivedKeyIterator = new DerivedHDKeyInfoIterator(parentDerivedKeyInfo, searchLimit);
        for (var _i = 0, derivedKeyIterator_2 = derivedKeyIterator; _i < derivedKeyIterator_2.length; _i++) {
            var key = derivedKeyIterator_2[_i];
            if (key.address === address) {
                matchedKey = key;
                break;
            }
        }
        return matchedKey;
    },
    addressOfHDKey: function (hdKey) {
        var shouldSanitizePublicKey = true;
        var derivedPublicKey = hdKey.publicKey;
        var ethereumAddressUnprefixed = ethUtil
            .publicToAddress(derivedPublicKey, shouldSanitizePublicKey)
            .toString('hex');
        var address = ethUtil.addHexPrefix(ethereumAddressUnprefixed).toLowerCase();
        return address;
    },
};
//# sourceMappingURL=wallet_utils.js.map