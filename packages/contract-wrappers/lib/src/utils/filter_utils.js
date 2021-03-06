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
var ethUtil = require("ethereumjs-util");
var jsSHA3 = require("js-sha3");
var _ = require("lodash");
var uuid = require("uuid/v4");
var TOPIC_LENGTH = 32;
exports.filterUtils = {
    generateUUID: function () {
        return uuid();
    },
    getFilter: function (address, eventName, indexFilterValues, abi, blockRange) {
        var eventAbi = _.find(abi, { name: eventName });
        var eventSignature = exports.filterUtils.getEventSignatureFromAbiByName(eventAbi, eventName);
        var topicForEventSignature = ethUtil.addHexPrefix(jsSHA3.keccak256(eventSignature));
        var topicsForIndexedArgs = exports.filterUtils.getTopicsForIndexedArgs(eventAbi, indexFilterValues);
        var topics = [topicForEventSignature].concat(topicsForIndexedArgs);
        var filter = {
            address: address,
            topics: topics,
        };
        if (!_.isUndefined(blockRange)) {
            filter = __assign({}, blockRange, filter);
        }
        return filter;
    },
    getEventSignatureFromAbiByName: function (eventAbi, eventName) {
        var types = _.map(eventAbi.inputs, 'type');
        var signature = eventAbi.name + "(" + types.join(',') + ")";
        return signature;
    },
    getTopicsForIndexedArgs: function (abi, indexFilterValues) {
        var topics = [];
        for (var _i = 0, _a = abi.inputs; _i < _a.length; _i++) {
            var eventInput = _a[_i];
            if (!eventInput.indexed) {
                continue;
            }
            if (_.isUndefined(indexFilterValues[eventInput.name])) {
                // Null is a wildcard topic in a JSON-RPC call
                topics.push(null);
            }
            else {
                var value = indexFilterValues[eventInput.name];
                var buffer = ethUtil.toBuffer(value);
                var paddedBuffer = ethUtil.setLengthLeft(buffer, TOPIC_LENGTH);
                var topic = ethUtil.bufferToHex(paddedBuffer);
                topics.push(topic);
            }
        }
        return topics;
    },
    matchesFilter: function (log, filter) {
        if (!_.isUndefined(filter.address) && log.address !== filter.address) {
            return false;
        }
        if (!_.isUndefined(filter.topics)) {
            return exports.filterUtils.doesMatchTopics(log.topics, filter.topics);
        }
        return true;
    },
    doesMatchTopics: function (logTopics, filterTopics) {
        var matchesTopic = _.zipWith(logTopics, filterTopics, exports.filterUtils.matchesTopic.bind(exports.filterUtils));
        var doesMatchTopics = _.every(matchesTopic);
        return doesMatchTopics;
    },
    matchesTopic: function (logTopic, filterTopic) {
        if (_.isArray(filterTopic)) {
            return _.includes(filterTopic, logTopic);
        }
        if (_.isString(filterTopic)) {
            return filterTopic === logTopic;
        }
        // null topic is a wildcard
        return true;
    },
};
//# sourceMappingURL=filter_utils.js.map