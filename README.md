# cuboid-deno-challenge

## Challenge

This is the cuboid-challenge-deno, based on the [cuboid-challenge-node](https://github.com/fullstacklabs/cuboid-challenge-node). The instructions for this challenge are the same from the [cuboid-challenge-node](https://github.com/fullstacklabs/cuboid-challenge-node). Can you solve it?

The structure of this module tries to follow the original structure as much as possible. This repository is for learning purposes.

## Technology

This app uses the following key technologies:

- [Deno](https://deno.land/)
- [Typescript](https://www.typescriptlang.org/)
- [Oak](https://github.com/oakserver/oak) - A framework for handling http. Inspired by Koa.
- [Cotton](https://github.com/rahmanfadhil/cotton) - Database toolkit with support for SQLite. Also a migration tool.
- [Rhum](https://drash.land/rhum/v1.x/#/) - A testing framework.
- [Superdeno](https://github.com/asos-craigmorten/superdeno) - Http testing module for Deno.
- [Denon](https://github.com/denosaurs/denon) - A utility/development tool for Deno. Inspired by nodemon.
- [Rosie](https://www.npmjs.com/package/rosie) - A factory for building JS objects.
- [Faker](https://www.npmjs.com/package/faker) - Fake data generator.

## Setup

Clone this repository.

Start by [installing Deno](https://deno.land/#installation).

Install [Denon](https://github.com/denosaurs/denon) dependency by running:

`deno install -qAf --unstable https://deno.land/x/denon@2.4.8/denon.ts`

Get into the project directory and install the remaining dependencies with:

`denon install`

The command above will install [Cotton](https://github.com/rahmanfadhil/cotton) which is also a dependency of this module.

## Run project

You can run the app with `denon start`

You can run the test suite with `denon test`

## Migrations

You can run migrations with:

`denon migration:up` and `denon migration:down`

You can create a new migration with:

`denon migration:create migrationname`

## IDE Configuration

Download the [Deno extension](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno).
The repo already includes configuration for VS Code to work with Deno.
