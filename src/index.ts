import generator from 'generate-password-ts';

const PASSWORD_COUNTS = 100;

const passwords = generator.generateMultiple(PASSWORD_COUNTS, {
  length: 10,
  numbers: true,
});

const ts1Path = './test/test1.ts';
const ts1Text = passwords
  .map((password, index) => `const password${index + 1} = '${password}';`)
  .join('\n');

const ts2Path = './test/test1.ts';
const ts2Text = passwords
  .map((password, index) => `const password${index + 1} = "${password}";`)
  .join('\n');

const jsonPath = './test/test.json';
const jsonObject: { [key: string]: string } = {};
passwords.forEach((password, index) => {
  jsonObject[`password${index + 1}`] = password;
});
const jsonText = JSON.stringify(jsonObject, null, 2);

await Bun.write(ts1Path, ts1Text);
await Bun.write(ts2Path, ts2Text);
await Bun.write(jsonPath, jsonText);
