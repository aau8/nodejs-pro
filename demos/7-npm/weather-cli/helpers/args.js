/**
 * Вернуть объект с аргументами, переданными с командой в CLI.
 * - [ ] Если после флага (строка с 1 тире в начале) есть строка без тире в начале, то в объект должен быть добавлен ключ соответствующий первому аргументу и его значение, соответствующее второму аргументу.
 * - [ ] Если после флага идет следующий флаг, то в объект должен добавиться ключ со значением true (boolean)
 * {
 *   "c": "moscow",
 *   "h": true
 * }
 */
export const getArgs = (args) => {
    const res = {};
    const [_executor, _file, ...rest] = args;
    const DELIMITERS = ",:;"

    rest.forEach((arg, index, array) => {
        if (arg[0] === "-") {
            const argName = arg.substring(1);

            if (array.length - 1 === index) {
                res[argName] = true;
            } else if (array[index + 1][0] !== "-") {
                const value = array[index + 1];

                // TODO: знак ; не работает в bash. Нужна проверка.
                if (value.search(new RegExp(`[${DELIMITERS}]`)) !== -1) {
                    res[argName] = value.split(new RegExp(`[${DELIMITERS}]`)).filter(Boolean)
                    return
                }

                res[argName] = value;
            } else {
                res[argName] = true;
            }
        }
    });

    return res;
};
