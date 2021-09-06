import rdf, { isNamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  Resource,
  register,
  useLRS,
  useProperty,
} from 'link-redux';
import React from 'react';

import { handle } from '../../../helpers/logging';
import argu from '../../../ontology/argu';
import ontola from '../../../ontology/ontola';
import { allTopologies } from '../../../topologies';

const InlineAction : FC = ({ subject }) => {
  const lrs = useLRS();
  const [actionStatus] = useProperty(schema.actionStatus);
  const [error] = useProperty(schema.error);
  const [target] = useProperty(schema.target);

  if (rdf.equals(actionStatus, ontola.DisabledActionStatus)) {
    return null;
  }

  if (rdf.equals(actionStatus, schema.CompletedActionStatus)) {
    return error ? (
      <span>
        {error.value}
      </span>
    ) : null;
  }

  const handleClick = React.useCallback(
    () => {
      if (!isNamedNode(subject)) {
        return null;
      }

      return lrs.exec(subject).catch((e) => {
        handle(e);
      });
    },
    [lrs, subject],
  );

  if (!target) {
    return null;
  }

  return (
    <Resource
      subject={target}
      onClick={handleClick}
    />
  );
};

InlineAction.type = [argu.ConfirmAction, argu.CopyAction, ontola.InlineAction];

InlineAction.topology = allTopologies;

export default register(InlineAction);

