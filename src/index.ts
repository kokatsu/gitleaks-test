import generator from 'generate-password-ts';

const password = generator.generate({
  length: 10,
  numbers: true,
});

const tsPath = './test/test.ts';
const tsText = `const password = '${password}';`;

const jsonPath = './test/test.json';
const jsonObject = {
  password: password,
};
const jsonText = JSON.stringify(jsonObject);

await Bun.write(tsPath, tsText);
await Bun.write(jsonPath, jsonText);
