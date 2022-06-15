import React from 'react';

import useJSON from '../../../Common/hooks/useJSON';
import { buildDistributionIri } from '../lib/distributionAgent';

export const useDistributions = (projectIri: string): [string[], () => void] => {
  const [distributions, reload] = useJSON<string[]>(`${projectIri}/distributions`);
  const [iris, setIris] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (distributions) {
      setIris(distributions.map((distId) => buildDistributionIri(projectIri, distId)));
    }
  }, [distributions]);

  return [iris, reload];
};
