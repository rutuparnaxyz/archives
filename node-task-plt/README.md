# PrettyLittleThing
## _Node Task_

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)
## Requirement
- [Pro NodeJS Task](https://github.com/ProPegasus/nodeJS-Task)

## Features

- By giving sku value in the query we can fetch the current stock levels
- In case of invalid sku error message will be shown.

## Setup

node-task-plt requires [Node.js](https://nodejs.org/) v14+ to run.
Install the dependencies and devDependencies and start the server.

```sh
git clone https://github.com/rutuparnaxyz/node-task-plt.git
cd node-task-plt
npm i
npm run dev
```

To run unit tests
```sh
npm run test
```

## Testing
Once successfully run open any browser and paste the below url format
```sh
http://localhost:5000/api/stocks?sku=KED089097/68/09
Response : {"sku":"KED089097/68/09","qty":4842}
```

In case of invalid sku the error message will be shown
```sh
http://localhost:5000/api/stocks?sku=INVALIDSKU/68/09
Response : "SKU does not exist : INVALIDSKU/68/09"
```
