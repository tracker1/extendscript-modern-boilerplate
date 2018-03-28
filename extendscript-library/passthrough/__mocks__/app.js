// TODO: Implementation Details
const app = {
  mockClear: () => Object.values(app).filter(fn => fn && fn.mockClear).forEach(fn => fn.mockClear()),
};

export default app;