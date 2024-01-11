#!/usr/bin/env node
import { getArgs } from "./helpers/args.js"
import logService from "./services/log.service.js"

const main = () => {
    const args = getArgs(process.argv)
    // console.log(args)
    logService.success("is done")
    if (args.h) {
        logService.help()
    } else if (args.c) {
        // сохранить город
    } else if (args.t) {
        // сохранить токен
    }
}

main()