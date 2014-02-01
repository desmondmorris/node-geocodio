'use strict';

var utils = require('./utils');
var request = require('request');
var querystring = require('querystring');

/**
 * Geocodio constructor
 * @param  {Object} options
 */
var Geocodio = function(options) {

    var defaults = {
        base_endpoint: 'http://api.geocod.io/v1'
    };

    var options = utils.merge(defaults, options);

    /**
     * buildUrl builds api request url
     * @param  {String} path uri
     * @param  {Object} params query parameters
     * @return {String}
     */
    this.buildUrl = function(path, params){
        var url = options.base_endpoint + '/' + path;
        url += '?api_key=' + options.api_key;

        if( params && params !== "null" && params !== "undefined" ) {
            url += '&' + querystring.stringify(params);
        }
        return url;
    }
};

/**
 * Geocode geocodes a single address or an array of addresses
 * @param  {String|Array} address or array of addresses
 * @param  {Object} callback
 */
Geocodio.prototype.geocode = function(address, cb) {

    var addresses = [];

    if ( Object.prototype.toString.call(address) === '[object Array]') {
        addresses = address;
    }
    else if (typeof address === 'string') {
        addresses.push(address);
    }

    var url = this.buildUrl('geocode');

    var options = {
      method: 'POST',
      headers: {'content-type' : 'application/json'},
      json: addresses
    };

    request(url, options, function (err, res, body) {
        if (err) {
            cb(err);
            return false;
        }

        if (res.statusCode !== 200) {
            cb(new Error(body.error));
            return false;
        }

        cb(null, body);
    });

};

/**
 * Reverse geocode a single set or an array of coordinates
 * @param  {String|Array} address or array of addresses
 * @param  {Object} callback
 */
Geocodio.prototype.reverse = function(coordinate, cb) {

    var coordinates = [];

    if ( Object.prototype.toString.call(coordinate) === '[object Array]') {
        coordinates = coordinate;
    }
    else if (typeof coordinate === 'string') {
        coordinates.push(coordinate);
    }

    var url = this.buildUrl('reverse');

    var options = {
      method: 'POST',
      headers: {'content-type' : 'application/json'},
      json: coordinates
    };

    request(url, options, function (err, res, body) {
        if (err) {
            cb(err);
            return false;
        }

        if (res.statusCode !== 200) {
            cb(new Error(body.error));
            return false;
        }

        cb(null, body);
    });

};

/**
 * Parse address parse request
 * @param  {String} address
 * @param  {Object} callback
 */
Geocodio.prototype.parse = function(address, cb) {

    var url = this.buildUrl('parse', {q: address});

    request(url, function (err, res, body) {

        if (err) {
            cb(err);
            return false;
        }

        if (res.statusCode !== 200) {
            cb(new Error(body.error));
            return false;
        }

        cb(null, body);
    })
};

module.exports = Geocodio;

