'use strict';

const assert = require('assert');
const Sentence = require('../');

const sentences = [
  {s: 'Can you turn up the music', i: 'turn', c: 'music'},
  {s: 'will you text me a message', i: 'text', c: 'message'},
  {s: 'will you text my Mom?', i: 'text', c: 'mom'},
  {s: 'turn up the music', i: 'turn', c: 'music'},
  {s: 'text me a message', i: 'text', c: 'message'},
  {s: 'text my Mom please', i: 'text', c: 'mom'},
  {s: 'turn on the kitchen light', i: 'turn', c: 'kitchen'},
  {s: 'turn on the lights', i: 'turn', c: 'lights'},
  {s: 'next song please', i: 'next', c: 'song'},
  {s: 'turn the music back on', i: 'turn', c: 'music'},
  {s: 'play the next song', i: 'play', c: 'song'},
  {s: 'play music in the kitchen', i: 'play', c: 'music'},
  {s: 'skip the song', i: 'skip', c: 'song'},
  {s: 'skip to the next track', i: 'skip', c: 'track'},
  {s: 'stop the music', i: 'stop', c: 'music'},
  {s: 'stop playin this song', i: 'stop', c: 'song'},
  {s: 'play some music in the kitchen', i: 'play', c: 'music'},
  {s: 'pause song', i: 'pause', c: 'song'},
  {s: 'pause music', i: 'pause', c: 'music'},
  {s: 'pause the music', i: 'pause', c: 'music'},
  {s: 'resume music', i: 'resume', c: 'music'},
  {s: 'resume track', i: 'resume', c: 'track'},
  {s: 'resume song', i: 'resume', c: 'song'},
  {s: 'Send text to Nate', i: 'send', c: 'nate'},
  {s: 'Send text to Nate pick up milk on your way home', i: 'send', c: 'nate'},
  {s: 'Can you text Nate', i: 'text', c: 'nate'},
  {s: 'Can you text Nate I\'m on my way home', i: 'text', c: 'nate'},
  {s: 'Text Nate pick up milk on your way home', i: 'text', c: 'nate'},
  {s: 'Text to Nate pick up milk on your way home', i: 'text', c: 'nate'},
  {s: 'turn down music', i: 'turn', c: 'music'},
  {s: 'turn down the music in the sun room', i: 'turn', c: 'music'},
  {s: 'turn up music in the sun room', i: 'turn', c: 'music'},
  {s: 'turn the music down in the kitchen', i: 'turn', c: 'music'},
  {s: 'turn up the music in the kitchen', i: 'turn', c: 'music'},
];

describe('Sentence.get()', function() {
  for (let i = 0; i < sentences.length; i++) {
    const data = sentences[i];
    it(data.s + ' ( i: ' + data.i + ' c: ' + data.c + ' )', () => {
      assert.deepEqual(new Sentence(data.s).get(),
        {intent: data.i, context: data.c}
      );
    });
  }
});
