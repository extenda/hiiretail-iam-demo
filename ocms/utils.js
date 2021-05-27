const request = require('axios');
const { writeFile, readFile, rm } = require('fs/promises');
const readline = require('readline');
const { Confirm, Input } = require('enquirer');

async function axios(req) {
  return request(req).then((res) => res.data);
}

function main(module, fun) {
  const step = async (...args) => {
    try {
      await fun(...args);
    } catch (err) {
      if (err.response) {
        console.error(`Error(${err.response.status}):`, err.response.data);
      } else {
        console.error(err);
      }
    }
  };
  if (require.main === module) step({});
  return step;
}

/**
 * @param prompt {string}
 * @returns {Promise<string>}
 */
async function readLine(prompt) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(prompt, (ans) => {
      rl.close();
      resolve(ans);
    }),
  );
}

/**
 * @param name {string}
 * @returns {Promise<string>}
 */
async function section(name) {
  const line = '-'.repeat(40);

  console.log(line);

  await readLine(name);

  console.log(line);
}

async function output(name, x) {
  console.log(`${name}:`, x);
  return readLine('');
}

/**
 * @param message {string}
 * @param initial {string?} default value
 * @returns {Promise<string>}
 */
async function confirm(message, initial) {
  return new Confirm({ message, initial }).run();
}

async function next(fileName, ...args) {
  if (await confirm('Continue?', true)) {
    require(fileName).main(...args);
  }
}

/**
 * @param message {string}
 * @param initial {string?} default value
 * @returns {Promise<string>}
 */
async function input(message, initial) {
  return new Input({ message, initial }).run();
}

const authTokenFile = './iam-token.jwt';

async function getAuthToken() {
  try {
    return await readFile(authTokenFile, 'utf-8').then((token) => token.trim());
  } catch (ignored) {
    console.log(`Get access token from: https://testrunner.hiiretail.com`);

    const authToken = await input('authToken');
    await writeFile(authTokenFile, authToken);

    return authToken.trim();
  }
}

async function deleteAuthToken() {
  try {
    await rm(authTokenFile);
  } catch (ignored) {}
}

module.exports = {
  main,
  getAuthToken,
  section,
  next,
  confirm,
  input,
  output,
  deleteAuthToken,
  axios,
};
