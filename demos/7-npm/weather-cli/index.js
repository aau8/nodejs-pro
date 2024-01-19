#!/usr/bin/env node

import { getArgs } from "./helpers/args.js"
import { isString } from "./helpers/types.js"
import { getWeather } from "./services/api.service.js"
import logService from "./services/log.service.js"
import { TOKEN_DICTIONARY, saveKeyValue } from "./services/storage.service.js"

const saveAPIToken = async (value) => {
    if (!isString(value)) {
        return logService.error("значение api_token может быть только строкой")
    }

    try {
        await saveKeyValue(TOKEN_DICTIONARY.apiToken, value)
        logService.success("ключ api_token добавлен")
    } catch(e) {
        logService.error("ошибка при добавлении api_token", e.message)
    }
}

const saveCity = async (value) => {
    if (!isString(value)) {
        return logService.error("значение value для saveCity может быть только строкой")
    }

    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, value)
        logService.success("город сохранен")
    } catch(err) {
        logService.error("ошибка при сохранении города:", err.message)
    }
}

const printForcast = async () => {
    try {
        const data = await getWeather()

        logService.forcast(data)
    } catch(e) {
        if (e?.response?.status === 401) {
            logService.error("указан неверный токен")
        } else if (e?.response?.status === 404) {
            logService.error("указан несуществующий город")
        } else {
            logService.error(e.message)
        }
    }
}

const initCLI = async () => {
    const args = getArgs(process.argv)

    if (args.h) {
        logService.help()
    }
    if (args.c) {
        // сохранить город
        await saveCity(args.c)
    }
    if (args.t) {
        // сохранить api token
        await saveAPIToken(args.t)
    }

    if (Object.keys(args).length === 0 || args.w) {
        await printForcast()
    }
}

initCLI()