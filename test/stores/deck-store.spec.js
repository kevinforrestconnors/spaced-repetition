import sinon from 'sinon';
import expect from 'expect';
import {chance} from '../helpers';
import {deckStore} from '../../src/stores/deck-store';
import {observable} from 'mobx';
import * as localStorageService from '../../src/services/local-storage-service';

describe('Deck store', () => {

  it('initial state', () => {
    // given
    const initialState = {
      decks: observable.map()
    };

    // when

    // then
    expect(deckStore.values).toEqual(initialState);
  });

  it('reset action resets the store', () => {
    // given
    const initialState = {
      decks: observable.map()
    };

    // when 
    const decks = chance.n(
      () => ({
        title: chance.guid(),
        body: chance.guid()
      }),
      chance.d20()
    );

    // when 
    decks.forEach(deckStore.actions.addDeck);
    deckStore.actions.reset();

    // then
    expect(deckStore.values).toEqual(initialState);
  });

  it('provides a addDeck action and deck(s) select functions', () => {
    // given
    const deckToGet = {
      title: chance.guid(),
      body: chance.guid()
    };
    const decks = chance.shuffle([
      deckToGet,
      chance.n(
        () => ({
          title: chance.guid(),
          body: chance.guid()
        }),
        chance.d20()
      )
    ]);

    // when 
    decks.forEach(deckStore.actions.addDeck);

    // then
    expect(deckStore.select.decks()).toEqual(decks);
    expect(deckStore.select.deck(deckToGet.title)).toEqual(deckToGet);
  });

  it('provides a deleteDeck action', () => {
    // given
    const deckToDelete = {
      title: chance.guid(),
      body: chance.guid()
    };
    const decksNotToDelete = chance.n(
      () => ({
        title: chance.guid(),
        body: chance.guid()
      }),
      chance.d20()
    );

    const decks = chance.shuffle([
      deckToDelete,
      ...decksNotToDelete
    ]);

    // when 
    decks.forEach(deckStore.actions.addDeck);
    deckStore.actions.deleteDeck(deckToDelete.title);

    // then
    expect(deckStore.select.deck(deckToDelete.title)).toEqual(undefined);
    decksNotToDelete.forEach((deck) => {
      expect(deckStore.select.deck(deck.title)).toEqual(deck);
    });
  });

  // it('initializes with decks from localStorage', () => {
  //   // given
    
  //   const filesInLocalStorage = chance.n(() => {
  //     const fileName = chance.guid();
  //     const fileContents = chance.guid();
  //     return new File([fileContents], fileName, { type: 'application/json' });
  //   }, chance.d20());
    
  //   const filesNotInLocalStorage = chance.n(() => {
  //     const fileName = chance.guid();
  //     const fileContents = chance.guid();
  //     return new File([fileContents], fileName, { type: 'application/json' });
  //   }, chance.d20());

  //   filesInLocalStorage.forEach(localStorageService.setFileContents);

  //   // when
    
    
  //   // then
  // });

  it('observes changes from localStorage', () => {

  });

});