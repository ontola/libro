import React from 'react';

import { ProjectContextReaderProps } from '../../context/ProjectContext';
import { useSitemap } from '../../hooks/useSitemap';
import { ResourceType } from '../../lib/types';

import { DataEditor } from './DataEditor';

export const SiteMapEditor = ({ project }: ProjectContextReaderProps): JSX.Element => {
  const sitemap = useSitemap(project);

  return (
    <DataEditor
      options={{
        codeLens: false,
        readOnly: true,
        wrappingIndent: 'indent',
      }}
      resourceType={ResourceType.SiteMap}
      value={sitemap}
    />
  );
};
