import { SomeTerm } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  FC,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import Link, { LinkTarget } from '../../components/Link';
import { cardMainTopology } from '../../topologies/Card/CardMain';

interface ActionMainProps {
  actionStatus?: SomeTerm;
  name?: SomeTerm;
  target?: SomeNode;
}

const ActionMain: FC<ActionMainProps> = ({
  children,
  subject,
}) => {
  const [actionStatus] = useProperty(schema.actionStatus);
  const [name] = useProperty(schema.name);

  if (actionStatus && actionStatus !== schema.PotentialActionStatus) {
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

ActionMain.type = schema.Action;

ActionMain.topology = [
  cardMainTopology,
];

export default register(ActionMain);
