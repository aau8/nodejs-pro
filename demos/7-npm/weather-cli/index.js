#!/usr/bin/env node

import { getArgs } from "./helpers/args.js"
import { isString } from "./helpers/types.js"
import { getWeather } from "./services/api.service.js"
import logService from "./services/log.service.js"
import { saveKeyValue } from "./services/storage.service.js"

const saveAPIToken = async (value) => {
    try {
        if (!isString(value)) {
            throw new Error()
        }

        await saveKeyValue("api_token", value)
        logService.success("ключ api_token добавлен")
    } catch(e) {
        logService.error("ошибка при добавлении api_token")
    }
}

const initCLI = async () => {
    const args = getArgs(process.argv)

    if (args.h) {
        logService.help()
    }
    if (args.c) {
        // сохранить город
        await saveKeyValue("city", args.c)
    }
    if (args.t) {
        // сохранить токен
        await saveAPIToken(args.t)
    }

    getWeather()
    .then(res => {
        console.log("weather:", res)
    })
}

initCLI()