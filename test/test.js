/* global describe, it */

var Geocodio = require('..')
var assert = require('assert')

describe('Geocodio', function () {
  it('is instantiable', function () {
    var client = new Geocodio()

    assert(client instanceof Geocodio)
  })

  it('is configurable', function () {
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

  it('has prototype methods', function () {
    var client = new Geocodio()

    assert(typeof client.get === 'function')
    assert(typeof client.post === 'function')
  })

  it('throws an exception with a invalid host', function (done) {
    var config = {
      base_endpoint: 'http://example.invalid'
    }

    var client = new Geocodio(config)

    client.get('geocode', {}, function (err, response) {
      assert.throws(
        function () {
          if (err) throw err
        },
        /ENOTFOUND/
      )
      done()
    })
  })

  it('throws an exception with an invalid API key', function (done) {
    var config = {
      base_endpoint: 'http://api.geocod.io/v1'
    }

    var client = new Geocodio(config)

    client.get('geocode', {}, function (err, response) {
      assert.throws(
        function () {
          if (err) throw err
        },
        /Invalid API key/
      )
      done()
    })
  })

  it('throws an exception with an invalid endpoint', function (done) {
    var config = {
      base_endpoint: 'http://api.geocod.io/invalid'
    }

    var client = new Geocodio(config)

    client.get('geocode', {}, function (err, response) {
      assert.throws(
        function () {
          if (err) throw err
        },
        /Invalid endpoint/
      )
      done()
    })
  })

  it('throws an exception with an invalid non-JSON endpoint', function (done) {
    var config = {
      base_endpoint: 'http://geocod.io/#invalid'
    }

    var client = new Geocodio(config)

    client.get('geocode', {}, function (err, response) {
      assert.throws(
        function () {
          if (err) throw err
        },
        /Invalid JSON/
      )
      done()
    })
  })
})
