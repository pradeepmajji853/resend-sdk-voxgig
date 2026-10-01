# Voxgig SDK Generator DX Report

## API Selected

Resend provides an official MIT-licensed OpenAPI specification and a harmless
authenticated domain-list operation. The pre-flight catalogue check inspected
802 public repositories in `voxgig-sdk` across nine API pages and found no
Resend match in repository names, descriptions, or homepages. This is a
point-in-time observation, not a guarantee about later catalogue additions.

## Environment

Node: 24.21.0 (isolated through npx); npm: 10.9.2.
Scaffolder: `@voxgig/create-sdkgen` 0.30.3; sdkgen: 4.32.1.
OS: macOS, Darwin arm64. OpenAPI: 3.1.2; API specification version: 1.5.1.
The input SHA-256 is
`d75e4e44f9fa0a70e26506998c1ed57f9e3b1a4bd38691bbcc67776894ceff4a`.
Node 24 was selected to satisfy the generator's engine requirement.

## Execution

Generation: PASS. Build: PASS. Tests: 513 passed, 0 failed, 1 skipped
(514 total). These results were executed for this assessment, then reproduced
when restoring the project into persistent storage on October 1, 2026.
The original scaffold took 21.57 seconds and generation took 6.37 seconds.
Live API: PASS on October 1, 2026: HTTP 200, empty domain list. Credential
availability interrupted the session, so time to first live success is not
reported as continuous working time. AI execution and an interrupted session
are not a measurement of the applicant's human work; no 30-minute claim is made.

## What Worked Well

- Expected: ingest the official specification without manually rebuilding an
  SDK. Observed: generation and compilation succeeded without editing client
  implementation. Impact: a usable starting point. Suggested improvement:
  preserve this direct OpenAPI workflow.
- Expected: understandable entity methods and checks. Observed:
  `Domain().list({ limit: 1 })` has a typed pagination match, and the generated
  suite passes. Impact: basic discovery and offline verification are quick.
  Suggested improvement: show this concrete first-call path in onboarding.

## DX Findings

### Author metadata does not determine license ownership

Expected: the configured project author appears in the license.
Observed: package metadata names Pradeep Majji, but root license generation
uses a fixed Voxgig publisher. Impact: assessment ownership requires explicit
license handling. Suggested improvement: offer a documented copyright-holder
setting while retaining upstream notices. Classification: VOXGIG DX ISSUE,
based on the generated output and license component. This project preserves
Voxgig's notice and adds Pradeep's contribution notice through maintained assets.

### Optional-component warnings need context

Expected: warnings distinguish incomplete output from optional extensions.
Observed: generation logged missing `ReadmeFeatures_ts` and `AgentGuide_ts`
components, yet exited successfully and emitted buildable code. Impact: a new
user must investigate whether documentation is incomplete. Suggested improvement:
label optional fallback behavior and explain any effect on output.
Classification: VOXGIG DX ISSUE; no functional failure was established.

The scaffold also reported two moderate dependency advisories and an `fs.F_OK`
deprecation warning. These are DEPENDENCY/ENVIRONMENT observations, not proven
SDK defects. They were not repaired during this assessment.

## Live API Verification

The prepared example uses the generated client with the test feature disabled
and delegates to native fetch. It checks the exact read-only endpoint, Bearer
header, HTTP 200, response array, and entity ID mapping without logging private
data. The real request returned HTTP 200 and zero records; the raw response and SDK
entity array agreed. Authentication succeeded. No domain inventory was supplied
for an independent account-level comparison.

## AI Usage

The generated tests caught three documentation failures after AI replaced the
root quickstart with a JavaScript block. Restoring the required TypeScript
quickstart addressed this USER ERROR without modifying generated tests.

AI inspected sources, ran generation/build/tests, prepared the smoke test, and
drafted documentation. Verification used actual exit codes, test summaries,
generated types, and upstream files. Live verification then confirmed HTTP status and response mapping.

## Scope / Limitations

Only TypeScript and generated offline tests were evaluated. Passing them does
not prove all 72 OpenAPI paths work. Pagination, sending, resource mutations,
rate limits, and production suitability were not tested.

## Overall Observation

The generator reached compiling code and passing tests quickly. The most
useful improvements would clarify ownership configuration and optional warnings.
The authenticated read also succeeded, while broader API coverage remains untested.
