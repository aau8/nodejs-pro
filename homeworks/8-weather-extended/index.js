#!/usr/bin/env node

import { getArgs } from "./helpers/args.js";
import { isArray, isString } from "./helpers/types.js";
import { getWeather } from "./services/api.service.js";
import logService from "./services/log.service.js";
import { TOKEN_DICTIONARY, getLanguage, removeValueFromKey, saveKeyValue } from "./services/storage.service.js";

const saveAPIToken = async (apiToken) => {
    if (!isString(apiToken)) {
        return logService.error("значение api_token может быть только строкой");
    }

    try {
        await saveKeyValue(TOKEN_DICTIONARY.apiToken, apiToken);
        logService.success("ключ api_token добавлен");
    } catch (e) {
        logService.error("ошибка при добавлении api_token", e.message);
    }
};

const saveCities = async (cities) => {
    if (!isArray(cities)) {
        return logService.error(
            "значение cities для saveCities может быть только массивом"
        );
    }

    try {
        await saveKeyValue(TOKEN_DICTIONARY.cities, cities);
        logService.success("город сохранен");
    } catch (err) {
        logService.error("ошибка при сохранении города:", err.message);
    }
};

const saveLanguage = async (language) => {
    if (!isString(language)) {
        return logService.error("значение language может быть только строкой");
    }
    if (language !== "ru" && language !== "en") {
        return logService.error("доступно только 2 языка: ru и en")
    }

    try {
        await saveKeyValue(TOKEN_DICTIONARY.language, language)
        logService.success("язык сохранен")
    } catch(err) {
        logService.error("ошибка при сохранении языка", err.message)
    }
}

const removeCities = async (cities) => {
    if (!isString(cities) && cities === "" && !isArray(cities)) {
        return logService.error(
            "значение cities для removeCities может быть либо массивом либо непустой строкой"
        );
    }

    cities = isString(cities) ? [cities] : cities;

    try {
        await Promise.all(
            cities.map((city) => removeValueFromKey(TOKEN_DICTIONARY.cities, city))
        );

        logService.success("город удален");
    } catch (err) {
        logService.error("ошибка при удалении города:", err.message);
    }
};

const printForcast = async () => {
    try {
        const weather = await getWeather();
        const language = await getLanguage();

        logService.forcast(weather, language);
    } catch (e) {
        if (e?.response?.status === 401) {
            logService.error("указан неверный токен");
        } else if (e?.response?.status === 404) {
            logService.error("указан несуществующий город");
        } else {
            logService.error(e.message);
        }
    }
};

const initCLI = async () => {
    const args = getArgs(process.argv);

    if (args.h) {
        logService.help();
    }
    if (args.c) {
        // сохранить города
        // QUESTION: как лучше поступить. Ограничить аргумент функции одним типом данных (массив) или добавить возможность передачи строки и создавать массив с 1 элементом (строкой) внутри функции
        await saveCities(isArray(args.c) ? args.c : [args.c]);
    }
    if (args.t) {
        // сохранить api token
        await saveAPIToken(args.t);
    }
    if (args.r) {
        // удалить город
        await removeCities(args.r);
    }
    if (args.l) {
        // сохранить язык
        await saveLanguage(args.l)
    }

    if (Object.keys(args).length === 0 || args.w) {
        await printForcast();
    }
};

initCLI();
