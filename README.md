# Geocodio

A library for accessing the [Geocodio](http://geocod.io/) geocoder service.


## Installation
    npm install geocodio


## Usage

```JavaScript

var Geocodio = require('geocodio');

var config = {
    api_key: 'APIKEY'
}

var geocodio = new Geocodio(config);

// Geocode a single address

var address = 'One Embarcadero Center, 9th Floor, San Francisco, CA 94111';

geocodio.geocode(address, function(err, response){
    if (err) throw err;

    console.log(response);
});

// Bulk geocode a list of addresses

var addresses = [
  'One Embarcadero Center, 9th Floor, San Francisco, CA 94111',
  '880 Broadway, New York, NY, 10003'
];

geocodio.geocode(addresses, function(err, response){
    if (err) throw err;

    console.log(response);
});

// Parse an address

var address = 'One Embarcadero Center, 9th Floor, San Francisco, CA 94111';

geocodio.parse(address, function(err, response){
    if (err) throw err;

    console.log(response);
});

```

## Changelog
* **0.0.1**: Initial implementation of geocode and parse endpoints
