import rdf from '@ontologies/core';
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
}) => {
  const lrs = useLRS();

  if (actionStatus && actionStatus !== NS.schema('PotentialActionStatus')) {
    return null;
  }

  if (children) {
    return children;
  }

  return (
    <span>
      <Button
        small
        icon="plus"
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

ActionCardMain.type = NS.schema('CreateAction');

ActionCardMain.topology = cardMainTopology;

ActionCardMain.mapDataToProps = [
  NS.schema('actionStatus'),
  NS.schema('name'),
];

ActionCardMain.propTypes = {
  actionStatus: linkType,
  children: PropTypes.element,
  name: linkType,
  subject: subjectType,
};

export default register(ActionCardMain);
