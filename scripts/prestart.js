import shell from 'shelljs';

async function main() {
  shell.mkdir('-p', 'dist');
  shell.rm('-rf', 'dist/*');
  shell.cp('-R', 'templates', 'dist/templates');
}

main();
