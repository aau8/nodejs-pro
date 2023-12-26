const EventEmitter = require("events");

const myEmitter = new EventEmitter();

const connectDB = () => {
    console.log("Connect to DB");
};

/**
 * Добавить обработчик для определенного события
 */
// myEmitter.on("connected", connectDB)

/**
 * Алиас для .on
 */
myEmitter.addListener("connected", connectDB);

/**
 * Вызывать событие
 */
myEmitter.emit("connected");

/**
 * Удалить обработчик события
 */
// myEmitter.off("connected", connectDB);

/**
 * Алиас для .off
 */
// myEmitter.removeListener("connected", connectDB);

/**
 * Удалить все повешенные обработчики на определенное события
 */
// myEmitter.removeAllListeners("connected");

/**
 * Повесить обработчик на событие, который удалится после первого вызова
 */
// myEmitter.once("one", () => {
//     console.log("Событие на 1 раз")
// })

/**
 * Вернет массив с именами событий (string[])
 */
// console.log(myEmitter.eventNames())

/**
 * Возвращает максимальное число обработчиков, которое можно повесить на 1 событие. По умолчанию - 10
 */
// console.log(myEmitter.getMaxListeners())

/**
 * Установить максимальное число обработчиков, которое можоно повесить на 1 событие.
 */
// myEmitter.setMaxListeners(5)

/**
 * Возвращает число повешенных обработчиков на определенное событие
 */
// console.log(myEmitter.listenerCount("connected"))

/**
 * Вернет массив с обработчиками повешенными на определенное событие
 */
// console.log(myEmitter.listeners("connected"))

/**
 * Добавляет обработчик в начало массива определенному событию
 */
// myEmitter.prependListener("connected", () => {
//     console.log("prepend connected");
// });

/**
 * Добавляет в начало массива обработчик определенного события и после 1-ого вызова события, этот обработчик будет удален
 */
// myEmitter.prependOnceListener("connected", () => {
//     console.log("once prepend connected");
// });

/**
 * Возвращает копию массива с обработчиками, повешенными на определенные событие. Метод похож на listeners, за исключением того, что в случае
 * rawListeners, обработчики, которые были повешены с помощью once, имеют обертку (wrapper) и свойство listener. При вызове обработчика через listener,
 * обработчик будет удален
 */
// myEmitter.rawListeners("connected")