import rdf, {
  Literal,
  NamedNode,
  SomeTerm,
  isNamedNode,
} from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  Resource,
  register,
  useLRS,
} from 'link-redux';
import React from 'react';

import { handle } from '../../../helpers/logging';
import argu from '../../../ontology/argu';
import ontola from '../../../ontology/ontola';
import { allTopologies } from '../../../topologies';

interface InlineActionTableRowProps {
  actionStatus?: SomeTerm;
  error?: Literal;
  target?: NamedNode;
}

const InlineAction: FC<InlineActionTableRowProps> = ({
  actionStatus,
  error,
  subject,
  target,
}) => {
  const lrs = useLRS();

  if (rdf.equals(actionStatus, ontola.DisabledActionStatus)) {
    return null;
  }
  if (rdf.equals(actionStatus, schema.CompletedActionStatus)) {
    return error ? <span>{error.value}</span> : null;
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

InlineAction.mapDataToProps = {
  actionStatus: schema.actionStatus,
  error: schema.error,
  object: schema.object,
  target: schema.target,
};

export default register(InlineAction);

