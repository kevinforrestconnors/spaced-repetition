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
    deleteDeck: action((deckName: string): void => {
      deckStore.values.decks.delete(deckName);
    }),
    initialize: action((): void => {
      deckStore.actions.reset();
      const decks = localStorageService.getDecks();
      for (const [name, contents] of Object.entries(decks)) {
        deckStore.actions.addDeck({
          title: name,
          body: contents
        });
      }
    })
  },

  select: {
    decks: (): Deck[] => Array.from(deckStore.values.decks.values()),
    deck: (deckName: string): Deck => deckStore.values.decks.get(deckName)
  }
};
