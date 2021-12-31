# Snut

Another pastebin with a clean and minimalist ui. Made for selfhosting.

Disclamer: still WIP

![screenshot](./.github/screenshot.png)

## Host your instance

### Installation

Install using docker

// TODO: write procedure

### Configuration

| ENV variable       | Default value | Format                                        | Description                                                                           |
| ------------------ | ------------- | --------------------------------------------- | ------------------------------------------------------------------------------------- |
| NODE_ENV           | development   | production, development, test                 | The application environment.                                                          |
| PORT               | 3000          | port                                          | The port to bind.                                                                     |
| MS_BEFORE_OUTDATED | 3600000       | Number                                        | The duration in ms before an entry is outdated.                                       |
| CHECK_OUTDATED_MS  | 10000         | Number                                        | The interval in ms to check for outdated.                                             |
| DB_TYPE            | sqlite        | sqlite, mysql, postgres, cockroachdb, mariadb | The database type                                                                     |
| DB_PATH            | ./db.sqlite   | String                                        | Sqlite database path.                                                                 |
| THROTTLE_TTL       | 1800000       | Number                                        | Timeframe for which requests are checked/remembered.                                  |
| THROTTLE_LIMIT     | 100           | Number                                        | Max number of connections during windowMs milliseconds before sending a 429 response. |

## Contribute

**Pull requests are welcome !** Feel free to contribute.

To contribute to this project, first clone this repo

```bash
git clone git@github.com:cauctus/projo.git
```

### Installation

```bash
$ npm install
```

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Credits

Coded with ❤️ by [Corentin Thomasset](https://github.com/CorentinTh).

Name found with ❤️ by [Aimie Tremoureux](https://twitter.com/Aimie39949465).

## License

This project is under the [MIT license](LICENSE).
