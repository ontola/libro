import React from 'react';

import Suspense from '../../Kernel/components/Suspense';

import Communicator from './Communicator';

interface CommunicatorLoaderProps {
  websiteIRI: string;
}

const CommunicatorLoader = ({ websiteIRI }: CommunicatorLoaderProps): JSX.Element | null => {
  if (!websiteIRI.includes('rdf.studio')) {
    return null;
  }

  return (
    <Suspense>
      <Communicator />
    </Suspense>
  );
};

export default CommunicatorLoader;
