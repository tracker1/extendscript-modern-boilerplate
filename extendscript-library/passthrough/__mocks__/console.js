export default jest.fn().mockImplementation(() => ({
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  info: jest.fn(),
  dir: jest.fn(),
}));