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

/**
 * Converts an email address into a human-readable name.
 *
 * The name is created by splitting the local part of the email address at
 * special characters (like '.', '-'), capitalizing the first letter of each
 * resulting word, and then joining the words together with spaces.
 *
 * @param {string} email - The email address to convert to a name.
 * @returns {string} The name derived from the email address.
 */
export const formatEmailToName = (email: string): string => {
  // Split the email into two parts by '@'
  const [localPart] = email.split('@');

  // Replace special characters (like '.', '-') with spaces
  let cleaned = localPart.replace(/[.\-_]/g, ' ');

  // Insert a space between letters and numbers
  cleaned = cleaned.replace(/([a-zA-Z])(\d)/g, '$1 $2');

  // Capitalize the first letter of each word
  const formatted = cleaned
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  return formatted;
}

/**
 * Extracts the initials from a given string.
 *
 * The function splits the input string into words, extracts the first capital letter
 * from each word, and combines these letters to form the initials. If there are
 * more than two initials, it returns only the first two.
 *
 * @param {string} input - The string from which to extract initials.
 * @returns {string} The extracted initials, up to two characters long.
 */
export const getInitials = (input: string): string => {
  // Split the string into words
  const words = input.split(' ');

  // Extract the first capital letter of each word
  const initials = words
      .map(word => RegExp(/[A-Z]/).exec(word)?.[0]) // Match the first capital letter in each word
      .filter(Boolean) // Remove null or undefined matches
      .join(''); // Combine into a single string

  // Return the first two characters of the resulting string
  return initials.slice(0, 2);
}