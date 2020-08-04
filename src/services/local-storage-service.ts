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

export async function setFileContents(file: File): Promise<void> {
  const fileContents = await readFileAsText(file);
  localStorage.setItem(file.name, fileContents);  
}

export function getFileContents(fileName: string): JSONString {
  return localStorage.getItem(fileName);
}

export function getFile(fileName: string): File {
  const fileContents = getFileContents(fileName);
  return new File([fileContents], fileName, { type: 'application/json'} );
}