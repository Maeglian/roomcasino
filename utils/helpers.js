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

export const getObjValuesFromLocalStorage = obj => {
  for (const key in obj) {
    if (obj[key].children) getObjValuesFromLocalStorage(obj[key].children);
    const storedValue = localStorage.getItem(key);
    if (storedValue) obj[key].value = JSON.parse(storedValue);
  }
};

export const writeObjValuesToLocalStorage = obj => {
  for (const key in obj) {
    if (obj[key].children) writeObjValuesToLocalStorage(obj[key].children);
    if (obj[key].value) localStorage.setItem(key, JSON.stringify(obj[key].value));
    if (!obj[key].value && localStorage.getItem(key)) localStorage.removeItem(key);
  }
};

export const deleteObjValuesFromLocalStorage = obj => {
  for (const key in obj) {
    if (obj[key].children) deleteObjValuesFromLocalStorage(obj[key].children);
    obj[key].value = '';
    localStorage.removeItem(key);
  }
};
