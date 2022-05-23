import React from 'react';

import { ProjectContext } from '../context/ProjectContext';
import { expandDeepSeed } from '../lib/expandDeepSeed';
import { flattenSeed } from '../lib/flattenSeed';

const BLACKLIST_PATTERNS = [
  '<',
  '#',
  '_:',
  'menus/footer',
];

const filterNodes = (resources: string[], websiteIRI: string): string[] => resources
  .filter((r) => r.startsWith(websiteIRI) && !BLACKLIST_PATTERNS.some((bp) => r.includes(bp)))
  .map((r) => r);

const nodesToSitemap = (resources: string[], websiteIRI: string): string => filterNodes(resources, websiteIRI).join('\n');

export const projectToSitemap = (project: ProjectContext): string => {
  const nodes = Object.keys(flattenSeed(expandDeepSeed(project.data, project.websiteIRI)));

  return nodesToSitemap(nodes, project.websiteIRI);
};

export const useSitemap = (project: ProjectContext): string =>
  React.useMemo(() => projectToSitemap(project), [project]);
