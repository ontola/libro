import { Map } from 'immutable';
import { SubjectProp } from 'link-redux/dist-types/types';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { AppState } from '../state/app/reducer';
import { isHighlighted } from '../state/app/selectors';

export const connectHighlighting = connect((state: Map<string, AppState>, { subject }: SubjectProp) => ({
  highlighted: subject && isHighlighted(state, subject),
}));

export const hightlightType = PropTypes.bool;

export const hightlightPropTypes = {
  highlighted: hightlightType,
};
