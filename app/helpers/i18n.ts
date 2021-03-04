/**
 * @param {string} str The string to normalize
 * @return {string} The string in lowercase without any special characters.
 */
export default function normalizedLower(str: string): string {
  return str.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
