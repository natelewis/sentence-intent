'use strict';

const assert = require('assert');
const Sentence = require('../');

const sentences = [
  {s: 'Can you turn up the music', i: 'turn', c: 'music'},
  {s: 'will you text me a message', i: 'text', c: 'text'},
  {s: 'will you text my Mom?', i: 'text', c: 'text'},
  {s: 'turn up the music', i: 'turn', c: 'music'},
  {s: 'text me a message', i: 'text', c: 'text'},
  {s: 'text my Mom please', i: 'text', c: 'text'},
  {s: 'turn on the kitchen light', i: 'turn', c: 'kitchen'},
  {s: 'turn on the lights', i: 'turn', c: 'lights'},
];

describe('Sentence.get()', function() {
  for (let i = 0; i < sentences.length; i++) {
    const data = sentences[i];
    console.log(data);
    it(data.s + ' ( i: ' + data.i + ' c: ' + data.c + ' )', () => {
      assert.deepEqual(new Sentence(data.s).get(),
        {intent: data.i, context: data.c}
      );
    });
  }
});
