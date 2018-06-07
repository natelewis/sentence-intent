'use strict'

const Intent = require('./lib');

const intent = new Intent('turn on the lights', true);

console.log('intent: ' + intent.getIntent());
console.log('context: ' + intent.getContext());
