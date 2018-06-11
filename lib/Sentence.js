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

const pos = require('pos');

/**
 * SentenceIntent class
 * @class Sentence
 */
class Sentence {
  /**
   * @constructs Intent
   * @param {string} text   The setence
   * @param {Boolean} debug If true log to console
   */
  constructor(text, debug) {
    const lexer = new pos.Lexer();
    const tagger = new pos.Tagger();

    this.debug = debug;

    this.wordList = lexer.lex(text);
    this.wordListLC = lexer.lex(text.toLowerCase());
    this.tagged = tagger.tag(this.wordList);

    this.wordTypes = [];
    for (let i = 0; i < this.wordListLC.length; i++) {
      // POS needs to be upcased for Tagger
      this.wordList[i].replace(/^s$/, 'S');
      this.wordTypes.push(this.getWordType(this.wordListLC[i]));
    }
    debug && console.log(this.tagged);
  }

  /**
   * Get the word type from the lexer safely
   * @param  {string} singleWord The word to query
   *
   * @return {string} The letter notation for the word type
   */
  getWordType(singleWord) {
    if (singleWord) {
      const lexer = new pos.Lexer();
      const tagger = new pos.Tagger();
      return tagger.tag(lexer.lex(singleWord))[0][1];
    }
    return undefined;
  }

  /**
   * A statement with only one word
   *
   * @return {Boolean}
   */
  isOneWordStatement() {
    return this.wordListLC.length < 2;
  }

  /**
   * The statement starts with 'will' or 'can'
   *
   * @return {Boolean}
   */
  startsWithCanOrWill() {
    return this.wordListLC.length > 2
      && (this.wordListLC[0] === 'can' || this.wordListLC[0] === 'will');
  }

  /**
   * First word is a verb
   *
   * @return {Boolean}
   */
  fristWordIsAVerb() {
    return this.wordTypes[0] === 'VB';
  }

  /**
   * First word is a noun then a determiner
   *
   * @return {Boolean}
   */
  firstWordIsANounThenDeterminer() {
    return this.wordListLC.length > 2
      && (this.wordTypes[0] === 'NN' && this.wordTypes[1].match(/DT/));
  }

  /**
   * First word is a noun then a personal pronoun
   *
   * @return {Boolean}
   */
  firstWordIsANounThenPersonalPronoun() {
    return this.wordListLC.length > 2
      && (this.wordTypes[0] === 'NN' && this.wordTypes[1].match(/PRP/));
  }

  /**
   * First two words are nouns
   *
   * @return {Boolean}
   */
  firstTwoWordsAreNouns() {
    return this.wordListLC.length > 1
      && (this.wordTypes[0] === 'NN' && this.wordTypes[1].match(/NN/));
  }

  /**
   * First word is a noun then TO
   *
   * @return {Boolean}
   */
  firstWordIsANountThenTo() {
    return this.wordListLC.length > 2
      && (this.wordTypes[0] === 'NN' && this.wordTypes[1].match(/TO/));
  }

  /**
   * Statement has a verb
   *
   * @return {Boolean}
   */
  hasAVerb() {
    return this.getWordsByType('VB', true).length > 0;
  }

  /**
   * Statement has a present tense verb
   *
   * @return {Boolean}
   */
  hasAPresentTenseVerb() {
    return this.getWordsByType('VBP', false).length > 0;
  }

  /**
   * Statement has at least one proposition and noun
   *
   * @return {Boolean}
   */
  hasPropositionAndNoun() {
    return this.getWordsByType('NN', false).length > 0
      && this.getWordsByType('IN', false).length > 0;
  }

  /**
   * Statement has a WDT, WP, WP$ or WRB
   *
   * @return {Boolean}
   */
  hasAWhWord() {
    return this.getWordsByType('W', false).length > 0;
  }

  /**
   * Statement has at least one adjective
   *
   * @return {Boolean}
   */
  hasAnAdjective() {
    return this.getWordsByType('JJ', false).length > 0;
  }

  /**
   * Return the next word of a given type after the start word
   * @param  {string} startWord The word before the given type
   * @param  {string} nextType  RegExp of word type that we are looking for
   *
   * @return {string}           The word of the type we found or undefined
   */
  getNextWordOfTypeAfterWord(startWord, nextType) {
    const startIndex = this.wordListLC.indexOf(startWord.toLowerCase());
    const arrayLength = this.wordListLC.length;

    this.debug && console.log('getNextWordOfTypeAfterWord: from startWord of '
      + startWord + ' looking a ' + nextType);

    for (let i = startIndex + 1; i < arrayLength; i++) {
      if (this.getWordType(this.wordList[i]).match(nextType)) {
        this.debug && console.log('getNextWordOfTypeAfterWord: found '
          + this.wordListLC[i]);

        // Found it! return it
        return this.wordListLC[i];
      }
    }

    // we fell through, no such word type exists
    this.debug && console.log('getNextWordOfTypeAfterWord: found undefined');
    return undefined;
  }

  /**
   * Get everything after the first instance of a word
   * @param  {string} startWord The word we start after
   *
   * @return {string}           The rest of the statement
   */
  getEverythingAfterWord(startWord) {
    // bail if we didn't get a start word
    if (typeof (startWord) === 'undefined') {
      return undefined;
    }

    // one after the start index
    const startIndex = this.wordListLC.indexOf(startWord.toLowerCase()) + 1;

    // pull the words
    let allTheWords = this.wordList.slice(
      startIndex,
      this.wordList.length
    ).join(' ');

    // if nothing is there give undef
    if (allTheWords === '') {
      return undefined;
    }

    // squeze tics
    allTheWords = allTheWords.replace(/ ' /, '\'');
    return allTheWords;
  }

  /**
   * Get the words by type from the array
   * @param  {string}  wordType The word type in string notation
   * @param  {Boolean} strict   Be strict about the word type (i.e. VA ~ VB...)
   *
   * @return {array} Array of words of the given type
   */
  getWordsByType(wordType, strict) {
    const wordList = this.tagged.filter(function(word) {
      if (strict) {
        return (word[1] === wordType);
      } else {
        return (word[1].slice(0, wordType.length) === wordType);
      }
    }).map(function(w) {
      return w[0];
    });

    return wordList;
  }



  /**
   * debug messaging for intent matches
   * @param  {string} queryMatch What was matched to set intent
   * @param  {string} intent     What intent is set to
   *
   * @return {string} intent
   */
  logIntentDebug(queryMatch, intent) {
    this.debug && console.log('statement: '
      + '(' + queryMatch + ') ' + intent);
    return intent;
  }

  /**
   * debug messaging for context matches
   * @param  {string} queryMatch What was matched to set intent
   * @param  {string} context    What context is set to
   *
   * @return {string} context
   */
  logContextDebug(queryMatch, context) {
    this.debug && console.log('statement: '
      + '(' + queryMatch + ') ' + context);
    return context;
  }
}


module.exports = Sentence;
