import $ from 'helper';
import File from 'file';
import Folder from 'folder';

import os from 'os';

export const exists = filePath => {
  filePath = normalize(String(filePath));
  return new File(filePath).exists || new Folder(filePath).exists;
}

export default {
  normalize: normalizePath,
}