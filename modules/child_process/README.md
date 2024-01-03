# Основной API модуля child_process

Основной функцией модуля является `child_process.spawn` и `child_process.spawnSync`. Все остальные функции сделаны по аналогии с указанными функциями в целях облегчения написания кода.

## child_process.exec(command: string, options?: ExecOptions | null, callback?: (error: Error | null, stdout: string | Buffer, stderr: string | Buffer) => void): ChildProcess

Метод создает новую оболочку, где вызывает указанную команду, которая обрабатывается, исходя из правил используемой оболочки. В колбэке возвращается сериализованная строка. Процесс возвращает Buffer, но функция меняет кодировку по умолчанию на *utf8*. Функция возвращает объект ChildProcess, который имеет свой api для взаимодействия с дочерним процессом.

В аргументе command передается команда с аргументами, указанные через пробел, например `node app.js DEV_MODE=true`

Колбэк вызывается после завершения дочернего процесса (событие **exit**) и до закрытия стандартного потока ввода *stdin* (событие **close**). Внутри колбэка мы имеем доступ к 3 свойствам (err, stdout, stderr).

*err* возвращает объект Error если есть ошибка или null, если ошибки нет.

*stdout* это содержимое стандартного потока вывода, т.е. консоли дочернего процесса. После завершения дочернего процесса, мы получим все содержимое консоли. В *stdout* попадает все сообщения консоли выведенные с помощью функции console.log()

*stderr* это также содержимое стандартного потока вывода, за тем исключением, что учитываются только сообщения выведенные с помощью функции console.error() и критические ошибки.

Мы можем получить доступ к стандартному выводу, подписавшись на событие *data*. Подробнее о [stdout](https://nodejs.org/docs/latest/api/child_process.html#subprocessstdout) и [событиях stream.Readable](https://nodejs.org/docs/latest/api/stream.html#class-streamreadable)

[Документация](https://nodejs.org/docs/latest/api/child_process.html#child_processexeccommand-options-callback)

---

## child_process.execFile(command: string, args?: string[] | null, options?: ExecFileOptions | null, callback?: (err: ExecFileException | null, stdout: string | Buffer, stderr: string | Buffer)): ChildProcess

Метод аналогичен `child_process.exec`, за исключением того, что он не создает оболочку (shell), а выполняет команду напрямую, создавая сразу новый процесс. В связи с чем, `child_process.execFile` выполняется немного быстрее чем `child_process.exec`.

[Документация](https://nodejs.org/docs/latest/api/child_process.html#child_processexecfilefile-args-options-callback)

---

## child_process.fork(modulePath: string | URL, args?: string[] | null, options?: ForkOptions | null): ChildProcess

Метод создает новый node-процесс с каналом связи IPC между родительским и дочерним процессом. Дочерний процесс существует до тех пор, пока в нем не будет вызвана ошибка или внутри дочернего процесса не будет вызван метод `process.disconnect()`.

Канал связи IPC добавляет возможность обмена сообщениями между родительским и дочерним процессами с помощью методов `childProcess.send(msg: string)` в родительском процессе и `process.send(msg: string)` в дочернем процессе. При вызове методов генерируется событие **message** которое вызывает колбэк, в котором можно получить данные переданного сообщения. Если канал связи IPS между процессами не установлен, методы вернут **undefined**

Для завершения дочернего процесса используется метод `childProcess.disconnect()` в родительском процессе и `process.disconnect()` в дочернем процессе. При вызове методов генерируется событие **disconnect** у обоих процессов, соединение обрывается, дочерний процесс завершается и канал ввода закрывается. После вызова метода, обмен сообщениями между процессами становится невозможным. Если канал связи IPC между процессами не установлен, методы вернут **undefined**.

[Документация](https://nodejs.org/docs/latest/api/child_process.html#child_processforkmodulepath-args-options)

---

## child_process.spawn(command: string, args?: string[] | null, options?: SpawnOptions | null): ChildProcess

Создает новый процесс, в котором вызывает указанную команду с аргументами. Метод является основным в модуле. С его помощью можно реализовать функциона любого другого асинхронного метода.

[Документация](https://nodejs.org/docs/latest/api/child_process.html#child_processspawncommand-args-options)

---

Модуль `child_process` также имеет синхронные аналоги вышеперечисленных методов, такие как `child_process.execSync`, `child_process.execFileSync`, `child_process.spawnSync`. Они ничем не отличаются от своих асинхронных аналогов за тем исключением, что они блокируют основной поток.

[Документация](https://nodejs.org/docs/latest/api/child_process.html#synchronous-process-creation)

---

При создании дочернего процесса, у него также создаются stdin (канал ввода), stdout (канал вывода) и stderr (канал ошибки). В родительском процессе можно навесить обработчики события на каналы дочернего процесса для отслеживания различных событий, пример того, как это сделать:

```js
const childProcess = exec("node index.js")

childProcess.stdout.on("data", (chunk) => {
    console.log("chunk:", chunk)
})
```

Таким образом можно навесить событие на любой канал связи обратившись предварительно к дочернему процессу. Подробнее о событиях:

[События канала stdin (Stream.Writeable)](https://nodejs.org/docs/latest/api/stream.html#class-streamwritable)
[События канала stdout и stderr (Stream.Readable)](https://nodejs.org/docs/latest/api/stream.html#class-streamreadable)

Единственно что нужно учитывать, что каналы ввода и вывода можно у дочернего процесса можно изменить, указав другой дескриптов в опции stdio у соответствующего метода. При любом значении отличном от **pipe**, при обращении к свойству stdout, stdin или stderr будет возвращать `null`.

[Документация](https://nodejs.org/docs/latest/api/child_process.html#optionsstdio)

---

Поскольку использование методов модуля `child_process` создает новый процесс со своим V8, Event loop и пр., передача данных между процессами может занять гораздо больше времени, чем использование того же модуля `worker_threads`. Поэтому, если между процессами планируется передача больших объемов данных, использование модуля `child_process` не будет лучшим решением.