# sentence-intent
[![Build Status](https://travis-ci.org/natelewis/sentence-intent.svg?branch=master)](https://travis-ci.org/natelewis/sentence-intent)

Extract the intent and potential context of a sentence.  This modules intended use is for routing command based statements by generalizing what the likely intent of the sentence is.

### Installation
This library is distributed on `npm`. In order to add it as a dependency, run the following command:

``` sh
$ npm install sentence-intent --save
```

## Example Usage

```javascript
const sentenceIntent = require('sentence-intent');

const intent = new sentenceIntent('Can you turn up the music?');

console.log('intent: ' + intent.getIntent());
console.log('context: ' + intent.getContext());
```

If for what ever reason it can not discover the intent or context they will be returned as undefined.

## License

Apache 2.0 - See [LICENSE][license] for more information.

[license]: LICENSE
