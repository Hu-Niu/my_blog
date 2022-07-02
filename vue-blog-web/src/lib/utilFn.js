// 简单的节流函数
// 参考：https://www.cnblogs.com/coco1s/p/5499469.html
export const throttle = (func, wait, mustRun) => {
    let timeout,
        startTime = new Date();

    return function () {
        let context = this,
            args = arguments,
            curTime = new Date();

        clearTimeout(timeout);
        // 如果达到了规定的触发时间间隔，触发 handler
        if (curTime - startTime >= mustRun) {
            func.apply(context, args);
            startTime = curTime;
            // 没达到触发间隔，重新设定定时器
        } else {
            timeout = setTimeout(func, wait);
        }
    };
}

// 防抖动函数
// 参考：https://www.cnblogs.com/coco1s/p/5499469.html
export const debounce = (func, wait, immediate) => {
    let timeout;
    return function () {
        let context = this, args = arguments;
        let later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

