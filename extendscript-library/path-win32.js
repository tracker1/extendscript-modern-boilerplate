import Folder from 'folder';

export const sep = '\\';
export const delimiter = ';';

export function basename(path, ext) {
  if (typeof path !== "string") {
    throw new TypeError(`Path must be a string. Received ${String(path)}`);
  }
  if (ext !== undefined && typeof ext !== "string") {
    throw new TypeError('"ext" argument must be a string');
  }
  
  var lastpart = path.replace(/[\\\/]+$/, '').split(/[\\\/]+/g).pop();
  
  if (ext && lastpart.substr(lastpart.length - ext.length) === ext) {
    return lastpart.substr(0, lastpart.length - ext.length);
  }
  
  return lastpart;
}

function dirname(path){
  if (typeof path !== 'string') {
    throw new TypeError(`Path must be a string. Received ${String(path)}`);
  }
  return path.replace(/[\\\/]+$/, '').replace(/[\\\/]+[^\\\/]+$/,'');
}

export function extname(path){
  if (typeof path !== 'string') {
    throw new TypeError(`Path must be a string. Received ${String(path)}`);
  }
  var m = path.match(/\.[^\.]*$/);
  return m && m[0] || '';
}

export function format(pathObject){
  throw new Error('path.format is not implemented');
}

export function isAbsolute(path){
  if (typeof path !== 'string') {
    throw new TypeError(`Path must be a string. Received ${String(path)}`);
  }
  return (/^([a-z]\:|[\\\/]{2})/i).test(path);
}

export function normalize(path){
  if (typeof path !== 'string') {
    throw new TypeError(`Path must be a string. Received ${String(path)}`);
  }

  var abs = isAbsolute(path);
  var ret = path.replace(/[\\\/]+/g, sep);
  if (!ret.length) {
    return ret;
  }

  // if it was an absolute path starting with separator
  // restore network path
  if (abs && ret[0] === sep) {
    ret = sep + ret;
  }

  ret = ret.replace(/\\\.\\/g, sep).replace(/^\.\\/, '').replace(/\\\.^/, '');
  ret = ret.replace(/\\[^\\]+\\\.\.\\/g, sep);
  return ret;
}


export function normalize2(path) {
  if (typeof path !== 'string') {
    throw new TypeError(`Path must be a string. Received ${String(path)}`);
  }

  var abs = isAbsolute(path);
  var ret = path.replace(/[\\\/]+/g, sep);

  // if it's not an absolute path, and starts with a slash
  // add the drive letter to the beginning of the path
  if (!abs && ret[0] === '\\') {
    var dl = Folder.dirname.match(/^([a-z]\:)/i);
    if (dl) {
      ret = `${dl[0].toUpperCase()}${ret}`;
    }
  }

  var ret = normalize(ret);
  if ((/[^\\]\\$/).test(path)) {
    return ret.substr(0, ret.length - 1);
  }
  return ret;
}


export function join(...paths){
  if (!paths.length) return '.';

  var invalid = paths.map(v => typeof v === 'string' ? '' : String(v)).filter(v => v).shift();
  if (invalid) {
    throw new TypeError(`Path must be a string. Received ${invalid}`);
  }

  return normalize(paths.join(sep));
}

export function parse(path){
  throw new Error('path.parse is not implemented');
}

export function relative(from, to) {
  const cwd = Folder.dirname;

  var a = normalize2(from);
  var b = normalize2(to);

  if (!isAbsolute(a)) {
    a = path.join(cwd, a);
  }
  if (!isAbsolute(b)) {
    b = path.join(cwd, b);
  }

  a = a.split(sep);
  b = b.split(sep);

  if (a[0] != b[0]) {
    if (isAbsolute(to)) return to;

    var ret = b.join(sep);
    if (ret.indexOf(cwd) === 0) {
      ret = ret.substr(cwd.length);
      if (ret[0] === '\\') ret = ret.substr(1);
    }
    return ret;
  }
  
  while (a[0] !== b[0]) {
    a.shift();
    b.shift();
  }

  return a.map(v => '..').concat(b).join(sep);
}

export function resolve(...paths) {
  var cwd = Folder.dirname;
  var parts = [];
  while (paths.length) {
    // encountered an absolute path, clear working parts
    if (isAbsolute(paths[0])) {
      parts = [];
    }
    parts.push(paths.shift());
  }
  var ret = normalize2(parts);
  if (!isAbsolute(ret)) {
    ret = join(cwd, ret);
  }
  return ret;
}

export function toNamespacedPath(path){
  throw new Error('path.toNamespacedPath not implemented');
}
