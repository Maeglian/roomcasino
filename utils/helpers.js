export const throttle = (func, ms = 100) => {
  let isThrottled = false;
  let savedArgs = null;

  const throttledFunc = () => {
    if (isThrottled) {
      // eslint-disable-next-line no-undef
      savedArgs = arguments;
    } else {
      // eslint-disable-next-line no-undef
      func(arguments);
      isThrottled = true;
      setTimeout(() => {
        isThrottled = false;
        if (savedArgs) {
          throttledFunc(...savedArgs);
          savedArgs = null;
        }
      }, ms);
    }
  };

  return throttledFunc;
};

export const findValInArr = (val, arr) => {
  return arr.find(item => item.value === val);
};
