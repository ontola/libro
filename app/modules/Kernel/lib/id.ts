/**
 * Ids with a path or fragment should not have a trailing slash.
 * Apex ids (domain root) should have a trailing slash.
 */
export const normalizeTrailingSlash = (id: string): string => {
  if (id.endsWith('/') && new URL(id).pathname.length > 1) {
    return id.slice(0, -1);
  }

  return id;
};

export const removeTrailingSlash = (id: string): string => id.slice(0, id.endsWith('/') ? -1 : undefined);

export const appendPath = (base: string, path: string): string => {
  if (path === '') {
    return base;
  }

  const clearBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const clearPath = path.startsWith('/') ? path.slice(1) : path;
  const separator = (clearPath.startsWith('#') || clearPath.startsWith('?')) ? '' : '/';

  return `${clearBase}${separator}${clearPath}`;
};
