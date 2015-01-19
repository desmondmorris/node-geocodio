'use strict';

var extend = require('util')._extend;
var request = require('request');
var querystring = require('querystring');

/**
 * Geocodio constructor
 * @param  {Object} options
 */
var Geocodio = module.exports =  function(config) {
  var defaults = {
    base_endpoint: 'http://api.geocod.io/v1',
    api_key: ''
  };

  this.config = extend(defaults, config);

  this.request = function(method, path, params, cb) {
    method = method.toUpperCase();

    var options = {
      method: method,
      url: this.config.base_endpoint + '/' + path,
      headers: {'content-type' : 'application/json'},
      qs: {api_key: this.config.api_key}
    };

    if (method === 'POST') {
      options.json = params;
    }
    else {
      options.qs = extend(options.qs, params);
    }

    request(options, function (err, res, body) {
      if (err) {
        cb(err);
      }
      else if (res.statusCode !== 200) {
        cb(new Error(body.error));
      }
      else {
        cb(null, body);
      }
    });

  }
};

/**
 * Geocode geocodes a single address or an array of addresses
 * @param  {String|Array} address or array of addresses
 * @param  {Object} callback
 */
Geocodio.prototype.geocode = function(address, cb) {
  var query = address;
  var method = "POST";

  if (typeof address === 'string') {
    method = "GET";
    query = {q: address};
  }

  this.request(method, 'geocode', query, function(err, body) {
    cb(err, body);
  });
};

/**
 * Reverse geocode a single set or an array of coordinates
 * @param  {String|Array} address or array of addresses
 * @param  {Object} callback
 */
Geocodio.prototype.reverse = function(coordinates, cb) {
  var query = coordinates;
  var method = "POST";

  if (typeof coordinates === 'string') {
    method = "GET";
    query = {q: coordinates};
  }

  this.request(method, 'reverse', query, function(err, body) {
    cb(err, body);
  });
};

/**
 * Parse address parse request
 * @param  {String} address
 * @param  {Object} callback
 */
Geocodio.prototype.parse = function(address, cb) {
  this.request('GET', 'parse', {q: address}, function(err, body) {
    cb(err, body);
  });
};
