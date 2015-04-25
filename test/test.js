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

  it('Has prototype methods', function () {
    var client = new Geocodio()

    assert(typeof client.get === 'function')
    assert(typeof client.post === 'function')
  })
})
