// mocks
import console2 from 'console';
import app from 'app';
import File from 'file';
import Folder from 'folder';
import Window from 'window';
import $ from 'helper';

import sit from './output';

jest.mock('console');
jest.mock('app');
jest.mock('file');
jest.mock('folder');
jest.mock('window');
jest.mock('helper');

describe('output', () => {
  beforeEach(() => {
    console2.mockClear();
    app.mockClear();
    File.mockClear();
    Folder.mockClear();
    Window.mockClear();
    $.mockClear();
  });

  it('Will output as expected', () => {
    sit();
    expect(console2.log.mock.calls[0][0]).toEqual('scope');
    expect(console2.log.mock.calls[0][1]).toEqual(0);

    expect(console2.log.mock.calls[1][0]).toEqual('scope');
    expect(console2.log.mock.calls[1][1]).toEqual(1);
  });
});
