type JSONString = string;

async function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();  
    fr.onerror = reject;
    fr.onload = () => {
      resolve(String(fr.result));
    };
    fr.readAsText(file);
  });
}

function getLocalStorageAsJSON(): {decks: Record<string, string>} {
  return JSON.parse(localStorage.getItem('spaced-repetition'));
}

export async function setFileContents(file: File): Promise<void> {
  const fileContents = await readFileAsText(file);
  const data = getLocalStorageAsJSON();
  data.decks[file.name] = fileContents;
  localStorage.setItem('spaced-repetition', JSON.stringify(data));  
}

export function getFileContents(fileName: string): JSONString {
  return getLocalStorageAsJSON().decks[fileName];
}

export function getFile(fileName: string): File {
  const fileContents = getFileContents(fileName);
  return new File([fileContents], fileName, { type: 'application/json'} );
}

export function getDecks(): Record<string, string> {
  const data = getLocalStorageAsJSON();
  return data.decks;
}

(function initialize() {
  if (localStorage.getItem('spaced-repetition') === null) {
    localStorage.setItem('spaced-repetition', JSON.stringify({
      decks: {}
    }));
  }
})();