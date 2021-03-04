import { FC, register } from 'link-redux';
import React from 'react';

import FieldHelper from '../../components/FormField/FieldHelper';
import { isPromise } from '../../helpers/types';
import { useContainerToArr } from '../../hooks/useContainerToArr';
import ll from '../../ontology/ll';
import { allTopologies } from '../../topologies';

const ErrorResponse: FC = ({
  subject,
}) => {
  const generalErrors = useContainerToArr(subject);

  if (!generalErrors || isPromise(generalErrors) || generalErrors.length === 0) {
    return null;
  }

  return (
    <div>
      {generalErrors.map((error) => <FieldHelper error={{ error: error.value }} key={error.value} />)}
    </div>
  );
};

ErrorResponse.type = ll.ErrorResponse;

ErrorResponse.topology = allTopologies;

export default register(ErrorResponse);
