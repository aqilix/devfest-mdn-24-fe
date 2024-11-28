import { ApiResponseError } from "@/services/api/types"

/**
 * @function getSubset
 * @description Creates a shallow copy of an object containing only a specified set of keys.
 * @param {object} obj - The object to subset.
 * @param {Array<string>} keys - The keys to include in the subset.
 * @returns {object} A shallow copy of obj, containing only the keys in keys.
 */
export function getSubset<T extends object, U extends keyof T>(
  obj: T,
  keys: Array<U>
): Pick<T, U> {
  const ret = Object.create(null);

  // Iterate over the keys array
  keys.forEach((key) => {
    ret[key] = obj[key];
  });

  return ret;
}


/**
 * Converts an array of API response errors into a multiline string.
 *
 * @param {ApiResponseError['detail']} errors - The array of API response errors to format.
 * @returns {string} A formatted multiline string where each line represents an error.
 *                   Each line includes the error type, location, and message.
 */
export const formatAPIResponseErrorArrayToMultilineString = (errors: ApiResponseError['detail']): string => {
  if (typeof errors === "string") return errors
  return (errors)
    .map(error =>
      `• ${error.type ?? "unknown"} ${error.loc?.[1] ?? "unknown"}, ${error.msg ?? "No message"}`
    )
    .join("\r\n");
}
