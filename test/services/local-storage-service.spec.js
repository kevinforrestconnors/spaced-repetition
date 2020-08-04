import expect from 'expect';
import {chance} from '../helpers';
import * as localStorageService from '../../src/services/local-storage-service';

describe('Local storage service', () => {

  describe('Setting file contents', () => {
    it('setFileContents sets localStorage with file name and contents', async () => {
      // given
      const fileName = chance.guid();
      const fileContents = chance.guid();
      const file = new File([fileContents], fileName, { type: 'application/json' });

      // when
      await localStorageService.setFileContents(file);

      // then
      expect(localStorage.getItem(fileName)).toEqual(fileContents);
    });
  });

  describe('Getting file contents', () => {
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
  });

});