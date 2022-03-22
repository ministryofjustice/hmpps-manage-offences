# TODO - UPDATE README 

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
To start the main services (excluding the manage-offences): 
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
