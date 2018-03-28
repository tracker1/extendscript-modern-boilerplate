// TODO: Implementation Details
const helper = {
  mockClear: () => Object.values(helper).filter(fn => fn && fn.mockClear).forEach(fn => fn.mockClear()),
};

export default helper;