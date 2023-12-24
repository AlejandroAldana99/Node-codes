async function retryPromise(promiseFunc, retries) {
    const finalErr = Error('Retry failed');
    if (retries <= 0) return Promise.reject(finalErr);
    try {
        const result = await promiseFunc();
        return result;
    }
    catch (err) {
        if (retries <= 0) {
            return Promise.reject(finalErr);
        }
        return retryPromise(promiseFunc, (retries - 1));
    }
}

let isHandle = false;

const getUserData = () => {
    new Promise((resolutionFunc, rejectionFunc) => {
        if (isHandle) {
            isHandle = true;
            rejectionFunc('Error');
        }
        else {
            resolutionFunc('Done');
        }
    });
}

let promise = retryPromise(getUserData, 3);
promise.then(function (data) { console.log(data) });