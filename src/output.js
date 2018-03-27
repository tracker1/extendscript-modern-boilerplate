import console from 'console';
import app from 'app';
import File from 'file';
import Folder from 'folder';
import $ from 'helper';

import dateToJson from './lib/date-to-json';

export default () => {
  const hello = "Heck Yeah!";

  for (let i=0; i<2; i++) {
    console.log('scope', i);
  }

  console.log('app', app);
  console.log('File', File);
  console.log('Folder', Folder);
  console.log('$', $);

  var obj = {a:1, b: [1,2], c: 3};
  console.log(JSON.stringify(obj));
  var { a, ...theRest } = obj;
  console.log('a', JSON.stringify(a));
  console.log('rest', JSON.stringify(theRest));
  console.log({ a, ...theRest });

  var ary = [1, 2, 3, 4, 5];
  console.log(ary);
  var [a, b, ...c] = ary;
  console.log([a, b, ...c]);
  console.log(Array.isArray(ary));

  console.log(`${hello} ${dateToJson()}`);

  return { success: true };
}
