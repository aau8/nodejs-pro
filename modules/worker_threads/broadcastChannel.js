/**
 * Попробовать создать несколько воркеров и создать у них экземпляры BroadcastChannel с одинаковыми
 * именами и отправить им несколько сообщений
 */

const {
    isMainThread,
    BroadcastChannel,
    Worker,
} = require("node:worker_threads");

const bc = new BroadcastChannel("hello");

if (isMainThread) {
    let c = 0;
    bc.onmessage = (event) => {
        console.log(event.data);
        if (++c === 10) bc.close();
    };
    for (let n = 0; n < 10; n++) new Worker(__filename);
} else {
    bc.postMessage("hello from every worker");
    bc.unref()
    // bc.close();
}
