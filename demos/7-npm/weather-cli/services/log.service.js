import chalk from "chalk";
import dedent from "dedent";

class Log {
    constructor() {}

    error(error) {
        console.error(chalk.bgRed(" ERROR "), error);
    }

    success(text) {
        console.log(chalk.bgGreenBright(" SUCCESS "), text);
    }

    help() {
        console.log(
            dedent(
                `
            ${chalk.bgCyan(" HELP ")}
              -h информация о модуле
              -c [CITY] сохранить город
              -t [TOKEN] сохранить токен
            `
            )
        );
    }

    forcast(data) {
        console.log(
            dedent(`
                ${chalk.bgYellow(" WEATHER ")}
                Город ${data.name}
                На улице ${data.weather[0].description},
                Температура ${data.main.temp}, ощущается как ${data.main.feels_like},
                Скорость ветра ${data.wind.speed} м/с.
            `)
        );
    }
}

export default new Log();
