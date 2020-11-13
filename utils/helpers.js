export const throttle = (func, ms = 100) => {
  let isThrottled = false;
  let savedArgs = null;

  const throttledFunc = () => {
    if (isThrottled) {
      savedArgs = arguments;
    } else {
      func(arguments);
      isThrottled = true;
      setTimeout(function() {
        isThrottled = false;
        if (savedArgs) {
          throttledFunc(...savedArgs);
          savedArgs = null;
        }
      }, ms);
    }
  }

  return throttledFunc;
}

