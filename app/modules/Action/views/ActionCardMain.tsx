import { SomeTerm } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  FC,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import Link, { LinkTarget } from '../../Common/components/Link';
import { cardMainTopology } from '../../Common/topologies';

interface ActionCardMainProps {
  actionStatus?: SomeTerm;
  name?: SomeTerm;
  target?: SomeNode;
}

const ActionCardMain: FC<ActionCardMainProps> = ({
  children,
  subject,
}) => {
  const [actionStatus] = useProperty(schema.actionStatus);
  const [name] = useProperty(schema.name);

  if (actionStatus !== schema.PotentialActionStatus) {
    return null;
  }

  if (children) {
    return (
      <React.Fragment>
        {children}
      </React.Fragment>
    );
  }

  return (
    <span>
      <Link
        target={LinkTarget.Modal}
        to={subject.value}
      >
        {name?.value}
      </Link>
    </span>
  );
};

ActionCardMain.type = schema.Action;

ActionCardMain.topology = [
  cardMainTopology,
];

export default register(ActionCardMain);
