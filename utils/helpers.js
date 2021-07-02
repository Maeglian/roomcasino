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

export const getObjValuesFromLocalStorage = (obj, exceptions = []) => {
  for (const key in obj) {
    if (!exceptions.includes(key)) {
      if (obj[key].children) getObjValuesFromLocalStorage(obj[key].children);
      const storedValue = localStorage.getItem(key);
      if (storedValue) obj[key].value = JSON.parse(storedValue);
    }
  }
};

export const writeObjValuesToLocalStorage = (obj, exceptions = []) => {
  for (const key in obj) {
    if (!exceptions.includes(key)) {
      if (obj[key].children) writeObjValuesToLocalStorage(obj[key].children);
      if (obj[key].value) localStorage.setItem(key, JSON.stringify(obj[key].value));
      if (!obj[key].value && localStorage.getItem(key)) localStorage.removeItem(key);
    }
  }
};

export const deleteObjValuesFromLocalStorage = obj => {
  for (const key in obj) {
    if (obj[key].children) deleteObjValuesFromLocalStorage(obj[key].children);
    obj[key].value = '';
    localStorage.removeItem(key);
  }
};

export const findValInArr = (val, arr) => {
  return arr.find(item => item.value === val);
};

export const searchInArrByString = (string, arr, itemName = undefined) => {
  const str = string.trim().toLowerCase();

  return arr
    .filter(item => {
      const itemValue = item[itemName] || item;
      return itemValue.toLowerCase().includes(str);
    })
    .sort((a, b) => {
      const aValue = a[itemName] || a;
      const bValue = b[itemName] || b;

      if (aValue.toLowerCase().indexOf(str) > bValue.toLowerCase().indexOf(str)) return 1;
      if (aValue.toLowerCase().indexOf(str) === bValue.toLowerCase().indexOf(str)) {
        if (aValue.toLowerCase() > bValue.toLowerCase()) return 1;
        if (aValue.toLowerCase() === bValue.toLowerCase()) return 0;
        return -1;
      }
      return -1;
    });
};

export const transformAustriaPhone = phone => {
  return phone.replace(/^\+?430/, match => match.replace('430', '43'));
};
