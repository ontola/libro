import { LinkedResourceContainer } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';

import './Omniform.scss';

const propTypes = {
  onClick: PropTypes.func.isRequired,
};

const OmniformPreview = ({ onClick }) => (
  <button
    className="Omniform__preview"
    type="button"
    onClick={onClick}
  >
    <LinkedResourceContainer subject={NS.app('c_a')} topology={NS.argu('formFooter')} />
    <span className="Omniform__preview-text">Plaats jouw reactie...</span>
  </button>
);

OmniformPreview.propTypes = propTypes;

export default OmniformPreview;
