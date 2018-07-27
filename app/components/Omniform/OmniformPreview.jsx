import { LinkedResourceContainer } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { FormFooter } from '../Form';
import { NS } from '../../helpers/LinkedRenderStore';

import './Omniform.scss';

const propTypes = {
  onClick: PropTypes.func.isRequired,
};

const OmniformPreview = ({ onClick }) => (
  <button
    className="Form Omniform Omniform__preview"
    type="button"
    onClick={onClick}
  >
    <FormFooter>
      <LinkedResourceContainer subject={NS.app('c_a')} />
      <span className="Form__footer-preview-text">Plaats jouw reactie...</span>
    </FormFooter>
  </button>
);

OmniformPreview.propTypes = propTypes;

export default OmniformPreview;
