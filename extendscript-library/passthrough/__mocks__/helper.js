import os from 'os';

// TODO: Implementation Details
const helper = {
  mockClear: () => Object.values(helper).filter(fn => fn && fn.mockClear).forEach(fn => fn.mockClear()),
  os: os.platform() === 'win32' ? 'Windows' : 'MacOS',
  getenv: (key) => process.env[key],
};

export default helper;