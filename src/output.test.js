// mocks
import console2 from 'console';
import app from 'app';
import File from 'file';
import Folder from 'folder';
import Window from 'window';
import $ from 'helper';

import sit from './output';

test('output', () => {
  beforeEach(() => {
    console2.mockClear();
    app.mockClear();
    File.mockClear();
    Folder.mockClear();
    Window.mockClear();
    $.mockClear();
  });

  if ('Will output as expected', () => {
    sit();
    expect(console2.log.calls[0][0]).toEqual('scope');
    expect(console2.log.calls[0][1]).toEqual(0);

    expect(console2.log.calls[1][0]).toEqual('scope');
    expect(console2.log.calls[1][1]).toEqual(1);
  });
});
