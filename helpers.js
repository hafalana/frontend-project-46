import { fileURLToPath } from 'url';
import path from 'path';

export function getFileName() {
  return fileURLToPath(import.meta.url);
}

export function getDirName() {
  return path.dirname(getFileName());
}
