/**
 * Searches for a key in an object at any level of nesting
 * @param obj - The object to search
 * @param key - The key to find
 * @returns The value of the key if found, or undefined if not found
 */
function findDeepValue(obj: Record<string, any>, key: string): any | undefined {
  if (obj?.hasOwnProperty(key)) {
    return obj[key];
  }

  for (const prop in obj) {
    if (typeof obj[prop] === "object" && obj[prop] !== null) {
      const result = findDeepValue(obj[prop], key);
      if (result !== undefined) {
        return result;
      }
    }
  }

  return undefined;
}

export default findDeepValue;
