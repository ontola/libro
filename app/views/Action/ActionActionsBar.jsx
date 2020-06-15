import rdf from '@ontologies/core';
import schema from '@ontologies/schema';
import rdfx from '@ontologies/rdf';
import {
  Property,
  ReturnType,
  linkType,
  register,
  subjectType,
  useLRS,
  useProperty,
  useResourceLinks,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';

import { bestType } from '../../helpers/data';
import { retrievePath } from '../../helpers/iris';
import SHACL from '../../helpers/shacl';
import teamGL from '../../ontology/teamGL';
import { actionsBarTopology } from '../../topologies/ActionsBar';
import { invalidStatusIds } from '../Thing/properties/omniform/helpers';

function getVariant(types) {
  switch (rdf.id(bestType(types))) {
    case rdf.id(teamGL.ContactedAction):
      return 'success';
    case rdf.id(teamGL.NotAvailableAction):
    case rdf.id(teamGL.UnsubscribeAction):
      return 'error';
    default:
      return undefined;
  }
}

const ActionActionsBar = ({
  actionStatus,
  history,
  object,
  subject,
  type,
}) => {
  const lrs = useLRS();
  const [target] = useProperty(schema.target);
  const [{ httpMethod, url }] = useResourceLinks(target, {
    httpMethod: schema.httpMethod,
    url: schema.url,
  });
  if (invalidStatusIds.includes(rdf.id(actionStatus))) {
    return null;
  }

  const handler = () => {
    if (httpMethod && httpMethod.value === 'GET') {
      return new Promise((resolve) => {
        lrs.actions.ontola.showDialog(url);
        resolve();
      });
    }

    return lrs.exec(
      subject,
      SHACL.actionToObject(lrs, subject)
    );
  };

  return (
    <Property
      label={schema.target}
      variant={getVariant(type)}
      onClick={handler}
      onDone={() => history.push(retrievePath(object.value))}
    />
  );
};

ActionActionsBar.type = schema.Action;

ActionActionsBar.topology = actionsBarTopology;

ActionActionsBar.mapDataToProps = {
  actionStatus: schema.actionStatus,
  object: schema.object,
  type: {
    label: rdfx.type,
    returnType: ReturnType.AllTerms,
  },
};

ActionActionsBar.hocs = [withRouter];

ActionActionsBar.propTypes = {
  actionStatus: linkType,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  object: linkType,
  subject: subjectType,
  type: linkType,
};

export default register(ActionActionsBar);
