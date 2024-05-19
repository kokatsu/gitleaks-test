import generator from 'generate-password-ts';

const PASSWORD_COUNTS = 100;

const passwords = generator.generateMultiple(PASSWORD_COUNTS, {
  length: 10,
  numbers: true,
});

const tsPath = './test/test.ts';
const tsText = passwords
  .map((password, index) => `const password${index + 1} = '${password}';`)
  .join('\n');

const jsonPath = './test/test.json';
const jsonObject: { [key: string]: string } = {};
passwords.forEach((password, index) => {
  jsonObject[`password${index + 1}`] = password;
});
const jsonText = JSON.stringify(jsonObject, null, 2);

await Bun.write(tsPath, tsText);
await Bun.write(jsonPath, jsonText);
