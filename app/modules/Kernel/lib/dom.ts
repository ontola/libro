export function getMetaContent(name: string): string | undefined {
  const header = __CLIENT__
    ? document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`) || undefined
    : undefined;

  return header ? header.content : undefined;
}

