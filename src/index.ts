import generator from 'generate-password-ts';

const password = generator.generate({
  length: 10,
  numbers: true,
});

const tsPath = './test/test.ts';
const tsText = `const password = '${password}';`;

await Bun.write(tsPath, tsText);
