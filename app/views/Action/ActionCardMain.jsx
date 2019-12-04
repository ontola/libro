import rdf from '@ontologies/core';
import schema from '@ontologies/schema';
import {
  linkType,
  register,
  subjectType,
  useLRS,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import Button from '../../components/Button';
import { NS } from '../../helpers/LinkedRenderStore';
import { cardMainTopology } from '../../topologies/Card/CardMain';

const ActionCardMain = ({
  actionStatus,
  children,
  name,
  subject,
  target,
}) => {
  const lrs = useLRS();

  if (actionStatus && actionStatus !== schema.PotentialActionStatus) {
    return null;
  }

  if (children) {
    return children;
  }

  const icon = target && lrs.getResourceProperty(target, schema.image);

  return (
    <span>
      <Button
        small
        icon={icon.value}
        theme="transparant"
        onClick={(e) => {
          e.preventDefault();
          lrs.exec(rdf.namedNode(`${NS.ontola('actions/dialog/alert').value}?resource=${encodeURIComponent(subject.value)}`));
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
