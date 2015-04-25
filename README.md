# Geocodio

<a href="https://nodei.co/npm/geocodio/"><img src="https://nodei.co/npm/geocodio.png"></a>

A library for accessing the [Geocodio](http://geocod.io/) geocoder service.

## Installation
    npm install geocodio

## Usage

### Configuration

```JavaScript
var Geocodio = require('geocodio');

var config = {
    api_key: 'APIKEY'
}

var geocodio = new Geocodio(config);

```

### Geocode a single address

```JavaScript

var address = 'One Embarcadero Center, 9th Floor, San Francisco, CA 94111';

geocodio.get('geocode', {q: address}, function(err, response){
    if (err) throw err;

    console.log(response);
});
```
[Example Response](http://geocod.io/docs/#toc_4)

### Bulk geocode a list of addresses

```JavaScript

var addresses = [
  'One Embarcadero Center, 9th Floor, San Francisco, CA 94111',
  '880 Broadway, New York, NY, 10003'
];

geocodio.post('geocode', addresses, function(err, response){
    if (err) throw err;

    console.log(response);
});
```
[Example Response](http://geocod.io/docs/#toc_7)


### Reverse geocode

```JavaScript
var coordinate = '42.583448,-71.005738';

geocodio.get('reverse', {q: coordinate}, function(err, response){
    if (err) throw err;

    console.log(response);
});

```
[Example Response](http://geocod.io/docs/#toc_11)


### Bulk reverse geocode a list of coordinates

```JavaScript
var coordinates = [
  '42.583448,-71.005738',
  '42.584714,-71.007359'
];

geocodio.post('reverse', coordinates, function(err, response){
    if (err) throw err;

    console.log(response);
});

```
[Example Response](http://geocod.io/docs/#toc_14)


### Parse an address

```JavaScript

var address = 'One Embarcadero Center, 9th Floor, San Francisco, CA 94111';

geocodio.get('parse', {q: address}, function(err, response){
    if (err) throw err;

    console.log(response);
});

```
[Example Response](http://geocod.io/docs/#toc_22)


## Changelog
* **0.0.1**: Initial implementation of geocode and parse endpoints.
* **0.1.0**: Introduces reverse endpoint.
* **1.0.0**: Adds request helper methods and decouples single/batch responses
* **1.1.0**: Adds query parameter support - #6 @walker
* **2.0.0**: Deprecates convenience methods

The MIT License (MIT)

Copyright (c) 2015 Desmond Morris

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
