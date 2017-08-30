/* global describe, it */

var Geocodio = require('..')
var assert = require('assert')

describe('Geocodio', function () {
  it('Is instantiable', function () {
    var client = new Geocodio()

    assert(client instanceof Geocodio)
  })

  it('Is configurable', function () {
    var config = {
      base_endpoint: 'https://api.geocod.io/v1',
      foo: 'bar'
    }

    var client = new Geocodio(config)

    assert(typeof client.config !== 'undefined')

    assert(typeof client.config.api_key !== 'undefined')
    assert.equal(client.config.api_key, '')

    assert(typeof client.config.base_endpoint !== 'undefined')
    assert.equal(client.config.base_endpoint, config.base_endpoint)

    assert(typeof client.config.foo !== 'undefined')
    assert.equal(client.config.foo, config.foo)
  })

  it('Can retrieve geocodes', function (done) {
    var liveTestConfig
    try {
      liveTestConfig = require('./live_test_config.json')
    } catch (err) {
      done('live test configuration not provided, please create live_test_config.json and supply an "api_key" field')
    }

    var config = liveTestConfig

    var client = new Geocodio(config)

    client.get('geocode', { q: '1109 N Highland St., Arlington VA' }, function (err, location) {
      done(err)
    })
  })

  it('Has prototype methods', function () {
    var client = new Geocodio()

    assert(typeof client.get === 'function')
    assert(typeof client.post === 'function')
  })
})
