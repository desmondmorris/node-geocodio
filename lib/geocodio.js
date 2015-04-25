var extend = require('util')._extend
var request = require('request')

/**
 * Geocodio constructor
 * @param  {Object} options
 */
var Geocodio = module.exports = function (config) {
  this.config = extend({
    base_endpoint: 'http://api.geocod.io/v1',
    api_key: ''
   }, config)

  this.request = function (method, path, params, cb) {
    method = method.toUpperCase()

    var options = {
      method: method,
      url: this.config.base_endpoint + '/' + path,
      headers: {'content-type': 'application/json'},
      qs: {api_key: this.config.api_key}
    }

    if (method === 'POST') {
      options.json = params
    } else {
      options.qs = extend(options.qs, params)
    }

    request(options, function (err, res, body) {
      if (err) {
        cb(err)
      } else if (res.statusCode !== 200) {
        cb(new Error(body.error), body, res)
      } else {
        cb(null, body, res)
      }
    })

  }
}

/**
 * Helper method for making GET requests
 * @param  {String} endpoint path
 * @param  {Object} params to pass with the request
 * @param  {Object} callback
 */
Geocodio.prototype.get = function (path, params, cb) {
  this.request('GET', path, params, cb)
}

/**
 * Helper method for making POST requests
 * @param  {String} endpoint path
 * @param  {Object} params to pass with the request
 * @param  {Object} callback
 */
Geocodio.prototype.post = function (path, params, cb) {
  this.request('POST', path, params, cb)
}
