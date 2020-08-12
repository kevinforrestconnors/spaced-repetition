import Chance from 'chance';
import {JSDOM} from 'jsdom';
import {deckStore} from '../src/stores/deck-store';

let jsdom = null;

function createWindow() {
  const html = `
    <!DOCTYPE html>
    <html>
      <head lang="en">
        <meta charset="UTF-8">
        <title>Window</title>
      </head>
      <body>
      </body>
    </html>
  `;

  jsdom = new JSDOM(html);

  const window = jsdom.window;
  
  window.props = {};
  global.window = window;
  global.document = window.document;
  global.navigator = window.navigator;
  global.self = window;
  global.XMLHttpRequest = window.XMLHttpRequest;
  global.HTMLElement = window.HTMLElement;
  global.HTMLCollection = window.HTMLCollection;
  global.NodeList = window.NodeList;

  window.onerror = function (_, __, ___, ____, error) {
    console.error(error.stack);
    process.exit(1);
  };
}

function resetStores() {
  deckStore.actions.reset();
}

function resetLocalStorage() {
  localStorage.setItem('spaced-repetition', JSON.stringify({
    decks: {}
  }));
}

beforeEach(() => {
  createWindow();
  resetLocalStorage();
  resetStores();
});
createWindow();

export function getJSDOM() {
  return jsdom;
}

export const chance = new Chance();