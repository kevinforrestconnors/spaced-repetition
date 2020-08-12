import { observable, action} from "mobx";
import * as localStorageService from '../services/local-storage-service';

export type Deck = {
  title: string;
  body: string;
}

const initialState = {
  decks: observable.map<string, Deck>()
};

export const deckStore = {
  values: initialState,

  actions: {
    reset: action((): void => {
      deckStore.values.decks.clear();
      deckStore.values = initialState;
    }),
    addDeck: action((deck: Deck): void => {
      deckStore.values.decks.set(deck.title, deck);
    }),
    deleteDeck: action((key: string): void => {
      deckStore.values.decks.delete(key);
    })
    // ,
    // initialize: (): void => {
    //   localStorageService.
    // }
  },

  select: {
    decks: (): Deck[] => Array.from(deckStore.values.decks.values()),
    deck: (key: string): Deck => deckStore.values.decks.get(key)
  }
};
