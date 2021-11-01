import { useEffect, useState } from "react";

export const isFalsy = (value: any) => (value === 0 ? false : !value);

export const cleanObject = (object: object) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    // @ts-ignore
    const value = result[key];
    if (isFalsy(value)) {
      // @ts-ignore
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

export const useDebounce = <T>(value: T, delay?: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(value), delay);
    return () => window.clearTimeout(timerId);
  }, [value, delay]);
  return debouncedValue;
};

export const useArray = <T>(persons: T[]) => {
  const [value, setValue] = useState(persons);
  return {
    value,
    clear: () => setValue([]),
    add: (person: T) => setValue([...value, person]),
    removeIndex: (index: number) => {
      const valueCopy = [...value];
      valueCopy.splice(index, 1);
      setValue(valueCopy);
    },
  };
};
