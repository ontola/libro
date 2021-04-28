import rdf, { SomeTerm } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  FC,
  register,
  useLRS,
  useResourceProperty,
} from 'link-redux';
import React from 'react';

import Button, { ButtonTheme } from '../../components/Button';
import libro from '../../ontology/libro';
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
  target,
}) => {
  const lrs = useLRS();
  const [icon] = useResourceProperty(target, schema.image);

  if (actionStatus && actionStatus !== schema.PotentialActionStatus) {
    return null;
  }

  if (children) {
    return <React.Fragment>{children}</React.Fragment>;
  }

  return (
    <span>
      <Button
        icon={icon.value}
        theme={ButtonTheme.Transparant}
        onClick={(e) => {
          e.preventDefault();
          lrs.exec(rdf.namedNode(`${libro.actions.dialog.alert.value}?resource=${encodeURIComponent(subject.value)}`));
        }}
      >
        {name?.value}
      </Button>
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
