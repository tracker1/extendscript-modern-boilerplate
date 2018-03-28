const con = {
  mockClear: () => Object.values(con).filter(fn => fn && fn.mockClear).forEach(fn => fn.mockClear()),
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  info: jest.fn(),
  dir: jest.fn(),
};

export default con;