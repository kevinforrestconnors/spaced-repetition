import expect from 'expect';
import {chance} from '../helpers';
import * as localStorageService from '../../src/services/local-storage-service';

describe('Local storage service', () => {

  describe('initial state', () => {
    it('localStorage not set up for user', () => {
      // given

      // when

      // then
      expect(localStorage.getItem('spaced-repetition') === null).toEqual(false);
      expect(JSON.parse(localStorage.getItem('spaced-repetition'))).toEqual({
        decks: {}
      });
    });

    it('localStorage already set up', async () => {
      // given
      const fileNames = chance.n(chance.guid, chance.d20());
      const fileContents = chance.n(chance.guid, fileNames.length);

      const decks = [];
      const expectedLocalStorageDecks = {};

      for (let i = 0; i < fileNames.length; i++) {
        expectedLocalStorageDecks[fileNames[i]] = fileContents[i];
        decks.push(new File([fileContents[i]], fileNames[i], { type: 'application/json' }));
      }

      await Promise.all(decks.map((deck) => (async () => {
        await localStorageService.setFileContents(deck);
      })()));

      // when

      // then
      expect(JSON.parse(localStorage.getItem('spaced-repetition'))).toEqual({
        decks: expectedLocalStorageDecks
      });
    });
  });

  describe('Setting file', () => {
    it('setFileContents sets localStorage with file name and contents in json format', async () => {
      // given
      const fileName = chance.guid();
      const fileContents = chance.guid();
      const file = new File([fileContents], fileName, { type: 'application/json' });

      // when
      await localStorageService.setFileContents(file);

      // then
      expect(JSON.parse(localStorage.getItem('spaced-repetition')).decks[fileName]).toEqual(fileContents);
    });
  });

  describe('Getting file', () => {
    it('getFileContents just passes to localStorage.getItem', async () => {
      // given
      const fileName = chance.guid();
      const fileContents = chance.guid();
      const file = new File([fileContents], fileName, { type: 'application/json' });
      await localStorageService.setFileContents(file);

      // when
      const retrievedFileContents = localStorageService.getFileContents(fileName);

      // then
      expect(retrievedFileContents).toEqual(fileContents);
    });

    it('getFile returns a file', async () => {
      // given
      const fileName = chance.guid();
      const fileContents = chance.guid();
      const file = new File([fileContents], fileName, { type: 'application/json' });
      await localStorageService.setFileContents(file);

      // when
      const retrievedFile = localStorageService.getFile(fileName);
      const retrievedFileContents = await (async function() {
        return new Promise((resolve, reject) => {
          const fr = new FileReader();  
          fr.onerror = reject;
          fr.onload = () => {
            resolve(String(fr.result));
          };
          fr.readAsText(file);
        });
      })();

      // then
      expect(retrievedFile.name).toEqual(fileName);
      expect(retrievedFileContents).toEqual(fileContents);
      expect(retrievedFile.type).toEqual('application/json');

    });

    it('getFileContents cannot find the file', async () => {

    });

    it('getDecks returns all the decks', async () => {
      // given
      const fileNames = chance.n(chance.guid, chance.d20());
      const fileContents = chance.n(chance.guid, fileNames.length);

      const decks = [];
      const expectedLocalStorageDecks = {};

      for (let i = 0; i < fileNames.length; i++) {
        expectedLocalStorageDecks[fileNames[i]] = fileContents[i];
        decks.push(new File([fileContents[i]], fileNames[i], { type: 'application/json' }));
      }
      
      await Promise.all(decks.map((deck) => (async () => {
        await localStorageService.setFileContents(deck);
      })()));

      // when
      // then

      expect(expectedLocalStorageDecks).toEqual(localStorageService.getDecks());

    });
  });

});