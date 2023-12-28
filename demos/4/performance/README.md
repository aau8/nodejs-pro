# Основные методы API для измерения производительности (performance)

Доступ к performance можно получить импортируя модуль `perf_hooks` или используя глобальную переменную `performance`

## performance.now(): number

Возвращает время высокой точности в мс, прошедшее с начала запуска node.

[Документация](https://nodejs.org/api/perf_hooks.html#performancenow)

---

## performance.mark(name: string, options?: MarkOptions): PerformanceMark

Cоздать пользовательскую запись с типом _mark_ на временной шкале для отслеживания производительности с помощью определения времени старта метки.

[Документация](https://nodejs.org/api/perf_hooks.html#performancemarkname-options)

---

## performance.measure(name: string, startMarkOrOptions: string | Object, endMark?: string): PerformanceMeasure

Возвращает объект со временем длительности выполнения кода между указанными метками

-   Если не указывать startMark и endMark, то в возвращенном объекте значение duration будет равно с момента начала запуска сценария до данного PerformanceMeasure.
-   Если 2-ым аргументом функции передать объект с опциями, то 3-ий аргумент endMark указывать не нужно.

[Документация](https://nodejs.org/api/perf_hooks.html#performancemeasurename-startmarkoroptions-endmark)

---

## performance.clearMarks(markName?: string): void

Удалит все записи PerformanceEntry с entryType равным *mark*, если не был передан аргумент. Если в `markName` была передана строка, будет удалена метка с указанным именем.

-   Массив с названием меток передать нельзя, только строку

[Документация](https://nodejs.org/api/perf_hooks.html#performanceclearmarksname)

---

## performance.clearMeasures(measureName?: string): void

Удалит все записи PerformanceEntry с entryType равным *measure*. Если передан аргумент `measureName`, будет удалена запись с указанным именем.

[Документация](https://nodejs.org/api/perf_hooks.html#performanceclearmeasuresname)

---

## performance.getEntries(): PerformanceEntry[]

Возвращает массив с записями PerformanceEntry определенными на временной шкале

[Документация](https://nodejs.org/api/perf_hooks.html#performancegetentries)

---

## performance.getEntriesByName(name: string, type?: EntryType): PerformanceEntry[]

Возвращает массив с записями PerformanceEntry определенными на временной шкале, которые соответствуют имени записи указанному в аргументе `name`. Если указан аргумент `type`, то записи также будут отфильтрованы по EntryType.

[Документация](https://nodejs.org/api/perf_hooks.html#performancegetentriesbynamename-type)

---

## performance.getEntriesByType(type: EntryType): PerformanceEntry[]

Возвращает массив с записями PerformanceEntry, которые определены на временной шкале производительности, отфильтрованные по типу - значению аргумента `type`

[Документация](https://nodejs.org/api/perf_hooks.html#performancegetentriesbytypetype)

---

## performance.timeOrigin: number

Свойство, которое возвращает время высокой точности в мс момента запуска node, в формате Unix

[Документация](https://nodejs.org/api/perf_hooks.html#performancetimeorigin)

---

## performance.timerify(fn: () => void, options?: TimerifyOptions): fn

Оборачивает и возвращает переданную в 1-ом аргументе функцию для определения ее производительности. Чтобы проверить производительность функции можно использовать методы `getEntries()`, `getEntriesByName()` или `getEntriesByType()`. EntryType записи равен *function*.

[Документация](https://nodejs.org/api/perf_hooks.html#performancetimerifyfn-options)

---

## new PerformanceObserver((list: PerformanceObserverEntryList, observer: PerformanceObserver) => void)

Класс для создания наблюдателя за записями на временной шкале производительности. В 1-ом аргументе класса мы передаем колбэк с аргументами *list* где содержится объект PerformanceObserverEntryList, который содержит такие методы как: `list.getEntries()`, `list.getEntriesByName()` и `list.getEntriesByType()`. Во 2-ом аргументе содержится экземпляр `observer` (наблюдателя).

Хорошей практикой считается в конце колбэка отчищать пользовательские записи с помощью `performance.clearMarks()` и `performance.clearMeasure()`. Поскольку наблюдатель влияет на производительность в худшую сторону, также в конце колбэка рекомендуется завершать наблюдатель (снимать подписку) с помощью `observer.disconnect()`

### performanceObserver.observe(options: { entryTypes: EntryType[], buffered?: boolean } | { type: EntryType, buffered?: boolean }): void

Метод для подписки экземпляра наблюдателя. В опциях мы можем передать массив с типами записей или 1 тип в формате строки, которые нужно отслеживать.

Если указан entryTypes, то type передавать не нужно и обратно.

[Документация .observe()](https://nodejs.org/api/perf_hooks.html#performanceobserverobserveoptions)

[Документация new PerformanceObserver()](https://nodejs.org/api/perf_hooks.html#class-performanceobserver)

---











## performance.now()

Возвращает высокоточное время (High-Resolution Time) с момента запуска сценария [spec](https://w3c.github.io/perf-timing-primer/#high-resolution-time)
Некоторые, для проверки производительности используют `Date.now()`. В спецификации это не рекомендуется делать. Время, полученное с помощью Date не является монотонным. Оно может изменяться не равномерно: уменьшаться в отрицательную сторону, увеличиваться быстрее или медленнее. Подобный эффект оказывается настройками NTP, пользовательскими настройками, дополнительными секундами и пр. [(источник)[https://w3c.github.io/perf-timing-primer/#monotonic-clock]]. Поэтому предпочтительнее использовать performance.

## performance.mark(markName, options)

Временная метка на временной шкале, которую могут указать пользователи для отслеживания производительности выполнения кода. Запись, созданная с помощью данного метода, реализует класс _PerformanceMark_, который является подклассом класса _PerformanceEntry_

**Аргументы:**

-   markName\*: string - имя метки
-   options: object - объект с необязательными опциями
    -   detail: any - данные, которые будут указаны в объекте метки в свойстве detail
    -   startTime: number - время начала выполнения метки. По умолчанию `performance.now()`

Для получения записи используются методы:

-   `performance.getEntries()`
-   `performance.getEntriesByName(name)`
-   `performance.getEntriesByType(entryType)`

```js
performance.mark("start");
for (let i = 0; i < 100000000; i++) {}
performance.mark("end");

getEntriesByType("mark"); // Вернется массив с 2 объектами PerformanceMark
```

**Источники:**
(performance.mark)[https://nodejs.org/api/perf_hooks.html#performancemarkname-options]
(performance.getEntries)[https://nodejs.org/api/perf_hooks.html#performancegetentries]
(performance.getEntriesByName)[https://nodejs.org/api/perf_hooks.html#performancegetentriesbynamename-type]
(performance.getEntriesByType)[https://nodejs.org/api/perf_hooks.html#performancegetentriesbytypetype]
(class PerformanceEntry)[https://nodejs.org/api/perf_hooks.html#class-performanceentry]
(class PerformanceMark)[https://nodejs.org/api/perf_hooks.html#class-performancemark]
