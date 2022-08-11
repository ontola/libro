import React from 'react';

import type { Module } from '../../../Module';
import Suspense from '../../Kernel/components/Suspense';

import Communicator from './Communicator';

interface CommunicatorLoaderProps {
  modules: Module[];
  websiteIRI: string;
}

const CommunicatorLoader = ({ modules, websiteIRI }: CommunicatorLoaderProps): JSX.Element | null => {
  if (!websiteIRI.includes('rdf.studio')) {
    return null;
  }

  return (
    <Suspense>
      <Communicator modules={modules} />
    </Suspense>
  );
};

export default CommunicatorLoader;
