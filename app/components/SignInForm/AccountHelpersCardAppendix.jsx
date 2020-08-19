import { Resource, linkType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import app from '../../ontology/app';
import { CardAppendix } from '../../topologies/Card';

const AccountHelpersCardAppendix = ({ currentSubject, onClick }) => (
  <CardAppendix>
    <Resource
      currentSubject={currentSubject}
      isActive={(to) => () => new URL(to).pathname === new URL(currentSubject.value).pathname}
      subject={app.ns('menus/session')}
      onClick={onClick}
    />
  </CardAppendix>
);

AccountHelpersCardAppendix.propTypes = {
  currentSubject: linkType,
  onClick: PropTypes.func,
};

export default AccountHelpersCardAppendix;
