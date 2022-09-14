# Manage offences
This is the user interface service for managing offences

## Running the app
The easiest way to run the app is to use docker compose to create the service and all dependencies. 

`docker-compose pull`

`docker-compose up`

### Dependencies
The app requires: 
* hmpps-auth - for authentication
* redis - session store and token caching

### Running the app for development
1. Create a `.env` file in the root of the project with the following content - Note - you will need to get the secret values from DEV:
```   
HMPPS_AUTH_URL="https://sign-in-dev.hmpps.service.justice.gov.uk/auth"
TOKEN_VERIFICATION_API_URL="https://token-verification-api-dev.prison.service.justice.gov.uk"
MANAGE_OFFENCES_API_URL="https://manage-offences-api-dev.hmpps.service.justice.gov.uk"
PRISON_API_URL="https://api-dev.prison.service.justice.gov.uk"
API_CLIENT_SECRET=FILL THIS IN WITH SECRET FROM DEV!!
SYSTEM_CLIENT_SECRET=FILL THIS IN WITH SECRET FROM DEV!!
```   
2. Start the redis container.
```   
docker-compose -f docker-compose-dev.yml pull
docker-compose -f docker-compose-dev.yml up --no-start
docker-compose -f docker-compose-dev.yml start redis
```

Install dependencies using `npm install`, ensuring you are using >= `Node v16.x`

And then, to build the assets and start the app with nodemon:

`npm run start:dev`

### Run linter

`npm run lint`

### Run tests

`npm run test`

### Running integration tests

For local running, start a test db, redis, and wiremock instance by:

`docker-compose -f docker-compose-test.yml up`

Then run the server in test mode by:

`npm run start-feature` (or `npm run start-feature:dev` to run with nodemon)

And then either, run tests in headless mode with:

`npm run int-test`
 
Or run tests with the cypress UI:

`npm run int-test-ui`

### Generating open-api types
1. Run `cd scripts`
2. Run `./generate-manage-offences-api-types.sh` and open the generated file `index.d.ts`
3. Resolve any lint errors, and remove the last line `export interface external {}`

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

