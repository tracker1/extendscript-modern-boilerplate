import $ from 'helper';

var _platform = $.os.toLowerCase().indexOf('mac') >= 0 ? 'darwin': 'win32';

export const EOL = _platform === 'darwin' ? '\n' : '\r\n';
export const platform = () => _platform;
export const tmpdir = () => $.getenv("TEMP") || $.getenv("Temp") || $.getenv("temp") || _platform === 'win32' ? 'C:\\Windows\\Temp' : '/tmp';
export const type = () => _platform === 'darwin' ? 'Darwin' : 'Windows_NT';
export const endianness = () => 'LE';
export const homedir = () => _platform === 'darwin' ? '~/' : $.getenv('USERPROFILE');

export default { EOL, platform, tmpdir, type, endianness, homedir };
