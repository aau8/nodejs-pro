import chalk from "chalk";
import dedent from "dedent";
import { DEFAULT_LANGUAGE } from "./storage.service.js";

class Log {
    constructor() {}

    error(...error) {
        console.error(chalk.bgRed(" ERROR "), error.join(" "));
    }

    success(...text) {
        console.log(chalk.bgGreenBright(" SUCCESS "), text.join(" "));
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

    async forcast(weather, language=DEFAULT_LANGUAGE) {
        console.log(`${chalk.bgYellow(" WEATHER ")}`);
        console.log(
            weather
                .map((city) => {
                    switch (language) {
                        case "ru":
                            return dedent(`
                                Город ${city.name}
                                На улице ${city.weather[0].description},
                                Температура ${city.main.temp}, ощущается как ${city.main.feels_like},
                                Скорость ветра ${city.wind.speed} м/с.
                            `);
                        case "en":
                            return dedent(`
                                The city of ${city.name}
                                It's ${city.weather[0].description} outside,
                                The temperature is ${city.main.temp}, it feels like ${city.main.feels_like},
                                Wind speed of ${city.wind.speed} m/s.
                            `);
                    }
                })
                .join("\n\n")
        );
    }
}

export default new Log();
