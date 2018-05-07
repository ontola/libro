import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { isHighlighted } from '../state/app/selectors';

export const connectHighlighting = connect((state, { subject }) => ({
  highlighted: subject && isHighlighted(state, subject),
}));

export const hightlightType = PropTypes.bool;

export const hightlightPropTypes = {
  highlighted: hightlightType,
};
