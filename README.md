# Manage offences
[![Ministry of Justice Repository Compliance Badge](https://github-community.service.justice.gov.uk/repository-standards/api/hmpps-manage-offences/badge?style=flat)](https://github-community.service.justice.gov.uk/repository-standards/hmpps-manage-offences)
[![Docker Repository on ghcr](https://img.shields.io/badge/ghcr.io-repository-2496ED.svg?logo=docker)](https://ghcr.io/ministryofjustice/hmpps-manage-offences)


This is the user interface service for managing offences

## Running the app
The easiest way to run the app is to use docker compose to create the service and all dependencies.

The production image now uses the `hmpps-node:24-alpine-runtime` base image and starts with `node dist/server.js` directly, so npm is not present in the final runtime stage.

`docker compose pull`

`docker compose up`

### Running the app for development

Copy the `.env.example` and create a new file called `.env.` replace all of the `FILL THIS IN WITH SECRET FROM DEV!!` with the correct values from the secrets in dev.

Install dependencies using `npm install`, ensuring you are using >= `Node v24.x`

Note: Using `nvm` (or [fnm](https://github.com/Schniz/fnm)), run `nvm install --latest-npm` within the repository folder
to use the correct version of node, and the latest version of npm. This matches the `engines` config in `package.json`
and the github pipeline build config.

And then, to build the assets and start the app with esbuild:

`npm run start:dev`

### Run linter

- `npm run lint` runs `eslint`.
- `npm run typecheck` runs the TypeScript compiler `tsc`.

### Run unit tests

`npm run test`

### Running integration tests

For local running, start a wiremock instance by:

`docker compose -f docker-compose-test.yml up`

Then run the server in test mode by:

`npm run start-feature` (or `npm run start-feature:dev` to run with auto-restart on changes)

After first install ensure playwright is initialised:

`npm run int-test-init:ci`

And then either, run tests in headless mode with:

`npm run int-test`

Or run tests with the UI:

`npm run int-test-ui`

### Generating open-api types
1. Run `cd scripts`
2. Run `./generate-manage-offences-api-types.sh` and open the generated file `index.d.ts`
3. Resolve any lint errors, and remove the last line `export interface external {}`
## Keeping your app up-to-date

While there are multiple ways to keep your project up-to-date this [method](https://mojdt.slack.com/archives/C69NWE339/p1694009011413449) doesn't require you to keep cherry picking the changes, however if that works for you there is no reason to stop.

In your service, add the template as a remote:

`git remote add template https://github.com/ministryofjustice/hmpps-template-typescript`

Create a branch and switch to it, eg:

`git checkout -b template-changes-2309`

Fetch all remotes:

`git fetch --all`

Merge the changes from the template into your service source:

`git merge template/main --allow-unrelated-histories`

You'll need to manually handle the merge of the changes, but if you do it early, carefully, and regularly, it won't be too much of a hassle.

### Usage of the application
#### Access and roles
Only users that are authenticated via HMPPS Auth can access this service. All authenticated users can access all behaviour except that defined by the below roles:
1. MANAGE_OFFENCES_ADMIN - This role allows users access to the admin screens; i.e. the 'load monitor' screen and the 'toggle jobs' screen.
2. UPDATE_OFFENCE_SCHEDULES - This role allows users to link and unlink offences from schedules

#### Initial load or full refresh
A technical admin user should do the initial load (or full refresh) into an environment. Such a user would require the MANAGE_OFFENCES_ADMIN.
Procedure for full load.
1. Enable the 'Full Sync SDRS' (disable all the other jobs). This job runs on a cron schedule every hour. Check the API logs to ensure its completion
2. Disable the 'Full Sync SDRS' after it has completed.
3. Enable the 'Full Sync NOMIS' (disable all the other jobs). This job runs on a cron schedule every hour. Check the API logs to ensure its completion
4. Disable the 'Full Sync NOMIS' after it has completed.
5. Enable the 'Delta Sync SDRS' and 'Delta Sync NOMIS' jobs (disable the other jobs). These jobs run on a cron schedule every twenty minutes and pull any changes from SDRS and push the changes to NOMIS.

# Support we have received

We have received [support from a number of teams across government](docs/CONTRIBUTIONS.md) to make this possible.
