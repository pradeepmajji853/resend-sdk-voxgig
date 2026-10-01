# Resend SDK generated with Voxgig sdkgen

Unofficial TypeScript client for [Resend](https://resend.com), generated with
[Voxgig sdkgen](https://github.com/voxgig/sdkgen) from Resend's
[official OpenAPI specification](https://github.com/resend/resend-openapi).
Not affiliated with or endorsed by Resend. Created for a Voxgig developer
experience assessment; see [REPORT.md](REPORT.md).

## Install and test

Use Node.js 24. The package has not been published to npm; build from this repository:

```sh
cd ts
npm ci
npm run build
npm test
cd ..
```

## Quickstart

Set `RESEND_API_KEY` in your local environment. A dedicated full-access key is
required to list domains; a sending-only key cannot perform this read.
Never commit credentials. In a TypeScript application (inside an async context):

```ts
import { ResendSDK } from './ts/dist/ResendSDK';

const client = new ResendSDK({
  apikey: process.env.RESEND_API_KEY,
  feature: { test: { active: false } },
});
const domains = await client.Domain().list({ limit: 1 });
console.log({ count: domains.length });
```

The [live smoke test](examples/live-smoke.cjs) additionally checks the actual
HTTP transport, Bearer authentication, status, and response mapping, without
printing domain names, IDs, or credentials:

```sh
node --env-file=/absolute/path/to/private/resend.env examples/live-smoke.cjs
```

The private file contains `RESEND_API_KEY=...`. This performs only
`GET /domains?limit=1`; an empty list is a valid result.

## Generate and reproduce

The checked-in `.sdk/def/resend.yaml` is the exact OpenAPI input. Its upstream
MIT license is [.sdk/def/resend-LICENSE](.sdk/def/resend-LICENSE).
Generator models, templates, components, and dependency lockfile live in `.sdk/`.
To regenerate the existing project with Node 24:

```sh
cd .sdk
npm ci
npm run build
npm run generate
cd ../ts
npm ci
npm run build
npm test
```

The original scaffold command, run from a clean parent directory, was:

```sh
npx --yes --package=node@24.21.0 --package=@voxgig/create-sdkgen@0.30.3 \
  -c 'create-sdkgen resend -o resend-sdk-voxgig -d resend.yaml -t ts -f test'
```

Then the repository name and author were configured in
[project.aontu](.sdk/model/project.aontu), followed by generation.
SDK source is generated; edit the model/templates/components rather than `ts/`.
The root README and license are maintained separately in `.sdk/src/Top.ts`;
the target license template preserves author and upstream notices.

## License

[MIT](LICENSE). Copyright 2026 Pradeep Majji for assessment contributions.
Voxgig notices are retained for generated code, and Resend's specification
retains its own upstream copyright. No ownership of upstream work is claimed.
