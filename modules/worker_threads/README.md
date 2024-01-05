# Модуль worker_threads

Модуль используется для создания новых потоков и выполнения скриптов внутри этих потоков, а также для создания каналов взаимодействия между собой.

## worker.getEnvironmentData(key: Serializable): Serializable

Метод используемый для получения данных окружения, установленных с помощью метода `worker.setEnvironmentData()`

[Документация](https://nodejs.org/docs/latest/api/worker_threads.html#workergetenvironmentdatakey)

---

## worker.setEnvironmentData(key: Serializable, value: Serializable): void

Метод используется для установки данных окружения в текущем потоке и всех воркеров, чьи экземпляры new Worker() были созданы в текущем потоке. Данные окружения можно получить с помощью метода `worker.getEnvironmentData()`

[Документация](https://nodejs.org/docs/latest/api/worker_threads.html#workersetenvironmentdatakey-value)

---

## worker.isMainThread: boolean

Вернет истину или ложь, исходя из того, является ли текущий поток основным (родительским), в котором был создан дочерний поток.

[Документация](https://nodejs.org/docs/latest/api/worker_threads.html#workerismainthread)

---

## worker.parentPort: MessagePort | null

Вернет родительский порт, если такой существует. Родительский порт есть только у воркера, который был создан в основном потоке. Родительский порт ссылается на основной поток. У этого свойства мы можем также, как и у экземпляра воркера использовать обработчики событий, `MessagePort.postMessage()`, `MessagePort.close()` и т.д.

[Документация](https://nodejs.org/docs/latest/api/worker_threads.html#workerparentport)

---

## worker.threadId: number

Вернет id текущего потока

[Документация](https://nodejs.org/docs/latest/api/worker_threads.html#workerthreadid)

---

## worker.workerData: any | null

Содержит данные, которые были переданы в опции **workerData**, при создании нового воркера `new Worker()`. Свойство доступно только в дочернем потоке.

[Документация](https://nodejs.org/docs/latest/api/worker_threads.html#workerworkerdata)

---

