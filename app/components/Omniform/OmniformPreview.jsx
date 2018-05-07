import { LinkedResourceContainer } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { FormFooter } from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';

import './Omniform.scss';

const propTypes = {
  onClick: PropTypes.func.isRequired,
};

const OmniformPreview = ({ onClick }) => (
  <button className="Omniform Omniform__preview" onClick={onClick}>
    <FormFooter>
      <LinkedResourceContainer subject={NS.app('c_a')} />
      <p className="Form__footer-preview-text">Plaats jouw reactie...</p>
    </FormFooter>
  </button>
);

OmniformPreview.propTypes = propTypes;

export default OmniformPreview;
