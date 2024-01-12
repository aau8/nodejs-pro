#!/usr/bin/env node
import { getArgs } from "./helpers/args.js"
import logService from "./services/log.service.js"
import { saveKeyValue } from "./services/storage.service.js"


const main = () => {
    const args = getArgs(process.argv)
    // console.log(args)
    // logService.success(process.arch)

    if (args.h) {
        logService.help()
    } else if (args.c) {
        // сохранить город
    } else if (args.t) {
        // сохранить токен
        saveKeyValue("TOKEN", args.t)
    }
}

main()