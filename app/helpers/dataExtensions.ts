/**
 * Keep in sync with server/utils/dataExtensions.js
 */

export const dataExtensions = ['.json', '.nq', '.nt', '.n3', '.rdf', '.ttl', '.png', '.hndjson', '.csv', '.pdf'];

export const hasDataExtension = (url: string): boolean => {
  try {
    const pUrl = new URL(url);

    return dataExtensions.some((x) => pUrl.pathname.endsWith(x));
  } catch {
    return false;
  }
};
