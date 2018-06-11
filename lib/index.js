/*  Sentence Intent Class

   Copyright 2018 Nate Lewis

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

 */

'use strict';

const Sentence = require('./Sentence');

/**
 * SentenceIntent class
 * @class Intent
 */
class Intent extends Sentence {
  /**
   * @constructs Intent
   * @param {string} text   The setence
   * @param {Boolean} debug If true log to console
   */
  constructor(text, debug) {
    super(text, debug);
  }

  /**
   * Get the implied context from the statement
   * @return {string} context
   */
  getContext() {
    // in order to get context, we need to make sure we have the Intent
    if (this.intent === undefined) {
      this.getIntent();
    }

    // if we don't have an intent, return undef for context
    if (this.intent === undefined) {
      return undefined;
    }

    this.context = this.getNextWordOfTypeAfterWord(
      this.intent,
      'NN',
      this.debug
    );

    // we got it, lets bail
    if (this.context) {
      return this.logContextDebug(
        'NounAfterIntent',
        this.context
      );
    }
/*
    if (this.firstWordIsANounThenDeterminer()) {
      this.context = this.wordListLC[0];
      return this.logContextDebug(
        'firstWordIsANounThenDeterminer',
        this.context
      );
    }

    if (this.firstWordIsANounThenPersonalPronoun()) {
      this.context = this.wordListLC[0];
      return this.logContextDebug(
        'firstWordIsANounThenPersonalPronoun',
        this.context
      );
    }

    if (this.hasAnAdjective()) {
      const firstAdjective = this.getWordsByType('JJ', false)[0];
      // try NN for context
      this.context = this.getNextWordOfTypeAfterWord(
        firstAdjective, 'NN',
        this.debug
      );

      return this.logContextDebug(
        'hasAnAdjective',
        this.context
      );
    }
*/
    return this.logContextDebug(
      'No context match',
      undefined
    );
  }

  /**
   * Get the implied intent from the statement
   *
   * @return {string} intent
   */
  getIntent() {
    if (this.startsWithCanOrWill()) {
      this.intent = this.wordListLC[2];
      return this.logIntentDebug(
        'startsWithCanOrWill',
        this.intent
      );
    }

    if (this.fristWordIsAVerb()) {
      this.intent = this.wordListLC[0];
      return this.logIntentDebug(
        'fristWordIsAVerb',
        this.intent
      );
    }

    if (this.firstWordIsANounThenDeterminer()) {
      this.intent = this.wordListLC[0];
      return this.logIntentDebug(
        'firstWordIsANounThenDeterminer',
        this.intent
      );
    }


    if (this.firstWordIsANounThenPersonalPronoun()) {
      this.intent = this.wordListLC[0];
      return this.logIntentDebug(
        'firstWordIsANounThenPersonalPronoun',
        this.intent
      );
    }

    if (this.firstTwoWordsAreNouns()) {
      this.intent = this.wordListLC[0];
      return this.logIntentDebug(
        'firstTwoWordsAreNouns',
        this.intent
      );
    }

    if (this.firstWordIsANountThenTo()) {
      this.intent = this.wordListLC[0];
      return this.logIntentDebug(
        'firstWordIsANountThenTo',
        this.intent
      );
    }

    if (this.hasAWhWord()) {
      // first one is the one we will use
      this.intent = this.getWordsByType('W', false)[0];
      return this.logIntentDebug(
        'hasAWhWord',
        this.intent
      );
    }

    if (this.hasAPresentTenseVerb()) {
      const firstPTVerb = this.getWordsByType('VBP', false)[0];
      this.intent = firstPTVerb;
      return this.logIntentDebug(
        'hasAPresentTenseVerb',
        this.intent
      );
    }

    if (this.hasAVerb()) {
      const firstVerb = this.getWordsByType('VB', true)[0];
      // please is a verb, lets not use it though
      if (firstVerb.toLowerCase() !== 'please') {
        this.intent = firstVerb;
        return this.logIntentDebug(
          'hasAVerb',
          this.intent
        );
      }
    }

    if (this.hasPropositionAndNoun()) {
      this.intent = this.getWordsByType('NN', false)[0];
      return this.logIntentDebug(
        'hasPropositionAndNoun',
        this.intent
      );
    }

    if (this.hasAnAdjective()) {
      this.intent = this.getWordsByType('JJ', false)[0];
      return this.logIntentDebug(
        'hasAnAdjective',
        this.intent
      );
    }

    return this.logIntentDebug(
      'No intent match',
      this.intent
    );
  }

  /**
   * The current intext and context as an object
   * @return {Object} Object containing the intent and context key
   */
  get() {
    return {
      intent: this.getIntent(),
      context: this.getContext(),
    };
  }
}


module.exports = Intent;
