import { FC, register } from 'link-redux';
import React from 'react';

import { useContainerToArr } from '../../hooks/useContainerToArr';
import ll from '../../ontology/ll';
import { allTopologies } from '../../topologies';

const ErrorResponse: FC = ({ subject }) => {
  const [generalErrors] = useContainerToArr(subject);

  if (generalErrors.length === 0) {
    return null;
  }

  return (
    <div>
      {generalErrors.map((error) => (
        <div
          className="Field__error"
          key={error.value}
        >
          {error.value}
        </div>
      ))}
    </div>
  );
};

ErrorResponse.type = ll.ErrorResponse;

ErrorResponse.topology = allTopologies;

export default register(ErrorResponse);
