import chalk from "chalk"
import dedent from "dedent"

class Log {
    constructor() {}

    error(error) {
        console.error(chalk.bgRed(" ERROR "), error)
    }

    success(text) {
        console.log(chalk.bgGreenBright(" SUCCESS "), text)
    }

    help() {
        console.log(dedent(
            `
            ${chalk.bgCyan(" HELP ")}
              -h информация о модуле
              -c [CITY] сохранить город
              -t [TOKEN] сохранить токен
            `
        ))
    }
}

export default new Log()