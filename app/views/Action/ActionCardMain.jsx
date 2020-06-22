import rdf from '@ontologies/core';
import schema from '@ontologies/schema';
import {
  linkType,
  register,
  subjectType,
  useLRS,
  useResourceProperty,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import Button from '../../components/Button';
import libro from '../../ontology/libro';
import { cardMainTopology } from '../../topologies/Card/CardMain';

const ActionCardMain = ({
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
    return children;
  }

  return (
    <span>
      <Button
        icon={icon.value}
        theme="transparant"
        onClick={(e) => {
          e.preventDefault();
          lrs.exec(rdf.namedNode(`${libro.actions.dialog.alert.value}?resource=${encodeURIComponent(subject.value)}`));
        }}
      >
        {name.value}
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

ActionCardMain.propTypes = {
  actionStatus: linkType,
  children: PropTypes.element,
  name: linkType,
  subject: subjectType,
  target: linkType,
};

export default register(ActionCardMain);
