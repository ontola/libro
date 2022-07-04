import { NamedNode } from '@ontologies/core';
import {
  FC,
  register,
  useActionById,
} from 'link-redux';
import React from 'react';

import { allTopologies } from '../../../../../topologies';
import Typeform from '../../../../Typeform/components';
import argu from '../../../ontology/argu';

export interface ExternalIRIProps {
  linkedProp: NamedNode;
  submitAction?: NamedNode;
  onClose?: () => void;
}

const ExternalIRI: FC<ExternalIRIProps> = ({
  onClose,
  linkedProp,
  submitAction,
}) => {
  const execAction = useActionById(submitAction);
  const handleSubmit = React.useCallback(() => {
    if (!execAction) {
      throw new Error('No action available');
    }

    execAction();
  }, [execAction]);

  return (
    <Typeform
      url={linkedProp.value}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
};

ExternalIRI.type = argu.Survey;

ExternalIRI.topology = allTopologies;

ExternalIRI.property = argu.externalIRI;

export default register(ExternalIRI);
