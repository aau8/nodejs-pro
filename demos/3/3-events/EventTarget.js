const myEventTarget = new EventTarget()

const log = () => {
    console.log("connected to DB")
}

/**
 * Повесить обработчик на определенное событие
 */
myEventTarget.addEventListener("connected", log)

/**
 * Вызвать определенное событие. В качестве аргумента передается экземпляр класса Event
 */
myEventTarget.dispatchEvent(new Event("connected"))

/**
 * Удалить обработчик определенного события
 */
myEventTarget.removeEventListener("connected", log)