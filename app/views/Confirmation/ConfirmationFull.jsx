import rdfx from '@ontologies/rdf';
import { linkType, register } from 'link-redux';
import React from 'react';
import { Redirect } from 'react-router';

import { retrievePath } from '../../helpers/iris';
import argu from '../../ontology/argu';
import { fullResourceTopology } from '../../topologies/FullResource';

const ConfirmationFull = ({ redirectUrl }) => (
  redirectUrl && <Redirect to={retrievePath(redirectUrl)} />
);

ConfirmationFull.type = argu.Confirmation;

ConfirmationFull.topology = fullResourceTopology;

ConfirmationFull.mapDataToProps = {
  redirectUrl: argu.redirectUrl,
  type: rdfx.type,
};

ConfirmationFull.propTypes = {
  redirectUrl: linkType,
};

export default register(ConfirmationFull);