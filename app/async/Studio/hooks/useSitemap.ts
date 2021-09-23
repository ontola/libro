import { Node } from '@ontologies/core';
import React from 'react';

const BLACKLIST_PATTERNS = [
  '#',
  'menus/footer',
];

const generateSitemap = (resources: Node[]) =>
  resources.filter((r) => !BLACKLIST_PATTERNS.some((bp) => r.value.includes(bp)))
    .map((r) => r.value)
    .join('\n');

export const useSitemap = (resources: Node[]): string => {
  const [sitemap, setSitemap] = React.useState('');

  React.useEffect(() => {
    setSitemap(generateSitemap(resources));
  }, [resources]);

  return sitemap;
};
