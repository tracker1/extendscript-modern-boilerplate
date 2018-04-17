import $ from 'helper';
import File from 'file';
import Folder from 'folder';

import path from 'path';

export const exists = filePath => {
  filePath = path.normalize(String(filePath));
  return new File(filePath).exists || new Folder(filePath).exists;
}

export default {
  exists,
}