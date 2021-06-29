import { SomeTerm } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  FC,
  register,
} from 'link-redux';
import React from 'react';

import Link, { LinkTarget } from '../../components/Link';
import { cardMainTopology } from '../../topologies/Card/CardMain';

interface ActionCardMainProps {
  actionStatus?: SomeTerm;
  name?: SomeTerm;
  target?: SomeNode;
}

const ActionCardMain: FC<ActionCardMainProps> = ({
  actionStatus,
  children,
  name,
  subject,
}) => {
  if (actionStatus && actionStatus !== schema.PotentialActionStatus) {
    return null;
  }

  if (children) {
    return <React.Fragment>{children}</React.Fragment>;
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

ActionCardMain.topology = cardMainTopology;

ActionCardMain.mapDataToProps = {
  actionStatus: schema.actionStatus,
  name: schema.name,
  target: schema.target,
};

export default register(ActionCardMain);
