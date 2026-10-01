// Authenticated read through the generated SDK; never logs account data or secrets.
const assert = require('node:assert/strict');
const { ResendSDK } = require('../ts/dist/ResendSDK.js');

async function main() {
  const key = process.env.RESEND_API_KEY;
  assert.ok(key, 'Set RESEND_API_KEY locally');
  const nativeFetch = globalThis.fetch.bind(globalThis);
  let observed;
  const client = new ResendSDK({
    apikey: key,
    feature: { test: { active: false } },
    headers: { 'User-Agent': 'pradeep-voxgig-assessment/0.1' },
    system: {
      fetch: async (url, init) => {
        const target = new URL(url);
        assert.equal(target.origin, 'https://api.resend.com');
        assert.equal(target.pathname, '/domains');
        assert.equal(init.method, 'GET');
        assert.equal(target.searchParams.get('limit'), '1');
        assert.equal(new Headers(init.headers).get('authorization'), `Bearer ${key}`);
        const response = await nativeFetch(url, {
          ...init, signal: AbortSignal.timeout(10000), redirect: 'error',
        });
        observed = { status: response.status, body: await response.clone().json() };
        return response;
      },
    },
  });
  const domains = await client.Domain().list({ limit: 1 });
  assert.ok(observed, 'SDK did not call the native transport');
  assert.equal(observed.status, 200);
  assert.ok(Array.isArray(observed.body.data));
  assert.ok(Array.isArray(domains));
  assert.equal(domains.length, observed.body.data.length);
  assert.deepEqual(domains.map(d => d.data().id), observed.body.data.map(d => d.id));
  console.log(JSON.stringify({
    endpoint: 'GET /domains?limit=1', status: observed.status,
    records: domains.length, transport: 'native-fetch',
  }));
}

main().catch(() => {
  // Full SDK errors can contain request context. Inspect locally; never upload raw errors.
  console.error('Smoke test failed. Inspect the status and sanitized error locally.');
  process.exitCode = 1;
});
