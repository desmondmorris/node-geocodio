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
      base_endpoint: 'http://api.geocod.io/v2',
      foo: 'bar',
      request_timeout: 300000
    }

    var client = new Geocodio(config)

    assert(typeof client.config !== 'undefined')

    assert(typeof client.config.api_key !== 'undefined')
    assert.equal(client.config.api_key, '')

    assert(typeof client.config.request_timeout !== 'undefined')
    assert.equal(client.config.request_timeout, config.request_timeout)

    assert(typeof client.config.base_endpoint !== 'undefined')
    assert.equal(client.config.base_endpoint, config.base_endpoint)

    assert(typeof client.config.foo !== 'undefined')
    assert.equal(client.config.foo, config.foo)

    assert(typeof client.config.notIncluded === 'undefined')
  })

  it('Has prototype methods', function () {
    var client = new Geocodio()

    assert(typeof client.get === 'function')
    assert(typeof client.post === 'function')
  })
})
