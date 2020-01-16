import rdf from '@ontologies/core';
import { register, subjectType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import app from '../../ontology/app';
import ll from '../../ontology/ll';
import { navbarTopology } from '../../topologies/Navbar';

import ErrorButtonHeader from './ErrorButtonHeader';

const ErrorNavbar = (props) => {
  if (rdf.equals(props.subject, app.ns('n?type=infinite'))) {
    return null;
  }

  return (
    <ErrorButtonHeader {...props} />
  );
};

ErrorNavbar.type = ll.ErrorResource;

ErrorNavbar.topology = navbarTopology;

ErrorNavbar.propTypes = {
  linkRequestStatus: PropTypes.shape({
    status: PropTypes.number,
  }),
  reloadLinkedObject: PropTypes.func.isRequired,
  subject: subjectType,
};

export default register(ErrorNavbar);
