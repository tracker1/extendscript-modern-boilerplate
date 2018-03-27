import shell from 'shelljs';

shell.exec(`webpack --mode development`);
shell.rm('dist/shims.js'); // build remnant
// shell.cp('-R', 'templates', 'dist/templates');