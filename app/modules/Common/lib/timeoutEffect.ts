export const timeoutEffect = (fn: () => void, ms: number): () => void => {
  const id = setTimeout(fn, ms);

  return () => clearTimeout(id);
};
