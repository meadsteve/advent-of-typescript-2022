import readline from 'readline';
import fs from 'fs';

export async function* readLines(path: string): AsyncGenerator<string> {
  const file = readline.createInterface({
    input: fs.createReadStream(path),
  });
  for await (const line of file) {
    yield line;
  }
}

export async function readSingleLine(path: string): Promise<string> {
  return (await (await readLines(path)).next()).value;
}
