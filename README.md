# Snut

Another pastebin with a clean and minimalist ui. Made for selfhosting.

Use it online : [snut.thomasset.co](https://snut.thomasset.co/)

![screenshot](./.github/screenshot.png)

## Host your instance

### Installation

```shell
docker run -d --restart unless-stopped -v $(pwd)/db:/app/db -e DATABASE_PATH=/app/db/db.sqlite -p 3000:3000 --name snut corentinth/snut:nightly
```

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
git clone git@github.com:CorentinTh/snut.git
```

### Installation

```bash
pnpm i
```

### Running the app

```bash
# development
pnpm dev
```

### Test

```bash
# unit tests
pnpm  test
```

## Credits

Coded with ❤️ by [Corentin Thomasset](https://github.com/CorentinTh).

Name found with ❤️ by [Aimie Tremoureux](https://twitter.com/dwenna_art).

## License

This project is under the [MIT license](LICENSE).
