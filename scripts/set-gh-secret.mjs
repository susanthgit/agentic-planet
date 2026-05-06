#!/usr/bin/env node
/**
 * set-gh-secret.mjs — Set a GitHub Actions repo secret via REST API.
 * Encrypts using libsodium sealed box with the repo's public key.
 *
 * Usage: node set-gh-secret.mjs SECRET_NAME SECRET_VALUE
 * Required env: GH_TOKEN, GH_OWNER, GH_REPO
 */

import sodium from 'libsodium-wrappers';

const [, , name, value] = process.argv;
if (!name || !value) {
  console.error('Usage: set-gh-secret.mjs NAME VALUE');
  process.exit(1);
}

const TOKEN = process.env.GH_TOKEN;
const OWNER = process.env.GH_OWNER;
const REPO = process.env.GH_REPO;
if (!TOKEN || !OWNER || !REPO) {
  console.error('Missing GH_TOKEN, GH_OWNER, or GH_REPO');
  process.exit(1);
}

const headers = {
  'Authorization': `Bearer ${TOKEN}`,
  'Accept': 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
};

async function main() {
  await sodium.ready;

  // Fetch repo public key
  const keyRes = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/actions/secrets/public-key`, { headers });
  if (!keyRes.ok) {
    console.error(`Failed to fetch public key: ${keyRes.status} ${await keyRes.text()}`);
    process.exit(1);
  }
  const { key, key_id } = await keyRes.json();

  // Encrypt
  const binkey = sodium.from_base64(key, sodium.base64_variants.ORIGINAL);
  const binsec = sodium.from_string(value);
  const encBytes = sodium.crypto_box_seal(binsec, binkey);
  const encrypted_value = sodium.to_base64(encBytes, sodium.base64_variants.ORIGINAL);

  // PUT
  const putRes = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/actions/secrets/${name}`,
    {
      method: 'PUT',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ encrypted_value, key_id }),
    }
  );
  if (!putRes.ok) {
    console.error(`Failed to set secret: ${putRes.status} ${await putRes.text()}`);
    process.exit(1);
  }
  console.log(`✅ Secret ${name} set on ${OWNER}/${REPO}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
