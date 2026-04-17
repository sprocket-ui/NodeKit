import fg from 'fast-glob';
import { readFileSync, writeFileSync } from 'node:fs';

const files = fg.sync('packages/**/package.json', {
  ignore: [
    '**/dist/**',
    '**/node_modules/**'
  ]
});

for (const file of files) {
  const pkg = JSON.parse(readFileSync(file, 'utf8'));

  if (!pkg.private && pkg.devDependencies) {
    delete pkg.devDependencies;
    writeFileSync(file, JSON.stringify(pkg, null, 2) + '\n');
  }
}
