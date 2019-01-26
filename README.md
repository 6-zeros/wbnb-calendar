# Wherebnb

> Optimized back-end of the booking / calendar service for an Airbnb listing page
> (This is the final state of the repo before deployment to AWS)

## Related Projects

  - https://github.com/6-zeros/wbnb-reviews
  - https://github.com/6-zeros/wbnb-suggestions
  - https://github.com/6-zeros/wbnb-gallery
  - https://github.com/6-zeros/wbnb-calendar (this repo)

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> To start the app, run the following from the root directory:

- npm install
- npm run generate-data (this will take roughly 10 min)
- npm run psql-seed-rooms (this will take roughly 20 min)
- npm run psql-seed-reservations (this will roughly 30 min)
- npm run react-dev
- npm start

> Then navigate to http://localhost:8080/rooms/1 (or any room from 1 through 10,000,000)

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

