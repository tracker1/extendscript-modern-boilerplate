import os from 'os';

import * as win32 from './path-win32';
import * as posix from './path-posix';

export default { ...(os.platform() === 'win32' ? win32 : posix), win32, posix };
