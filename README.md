# Walmart Homework Assignemnt
by William Yu

## Quick Start

1. Install [Node](https://nodejs.org/en/)
2. Clone the repo
3. In the project dir, run `npm i` in your terminal
    - this might take awhile, run with `npm i --verbose` if it seems like it's hanging
4. To run tests, run `npm test`
5. For coverage, run `npm test -- --coverage`
    - Coverage is at /coverage/lcov-report/index.html
6. To launch the dev server, run `REACT_APP_API_KEY=yourapikey npm start`
    - The app will be available at http://localhost:3000/
    - Alternatively, you can place your api key in src/common.js for `apiKey`

## Overview

- The SPA is done in React. 
- It was bootstrapped with create-react-app
- React Bootstrap component library 
- Tests are written in Jest and run with Jest
  - 100% test coverage
  - Tests live next to their source files, either with the same name or in a /test folder
- API service are in src/services/WalmartApi.js
- App.js is the main app container and houses the logic for the app
- Display components are in /src/components
  - Header - branding and the search bar
  - Results - the query results
  - Details - product look up and recommended items
  - Recommended - recommended items components