import { LinkedResourceContainer } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

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
    <span className="Omniform__preview-text">
      <FormattedMessage
        defaultMessage="Share your response..."
        id="https://app.argu.co/i18n/forms/omniform/newResponsePreview"
      />
    </span>
  </button>
);

OmniformPreview.propTypes = propTypes;

export default OmniformPreview;
