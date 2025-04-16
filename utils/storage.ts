export const setStorage = (key: string, value: any) => {
  if (typeof value === 'object') {
    localStorage.setItem(key, JSON.stringify(value));
  }
  else {
    localStorage.setItem(key, value);
  }
};

export const getStorage = (key: string) => {
  const value = localStorage.getItem(key);

  try {
    return value ? JSON.parse(value) : null;
  }
  catch {
    return value;
  }
};
