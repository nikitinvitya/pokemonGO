const toCamelCase = (str: string): string => {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
};

export function camelizeKeys<T>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj.map((item) => camelizeKeys(item)) as unknown as T;
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj as object).reduce(
      (acc, key) => {
        const camelKey = toCamelCase(key);
        (acc as Record<string, unknown>)[camelKey] = camelizeKeys(
          (obj as Record<string, unknown>)[key],
        );
        return acc;
      },
      {} as Record<string, unknown>,
    ) as T;
  }
  return obj;
}
