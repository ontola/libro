// @flow
import './motionsList.scss';
import React, { PropTypes } from 'react';
import { MotionsListItem } from '../';

const propTypes = {
  motions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const MotionsList = ({ motions }) => (
  <ul>
    {motions.map((motion) =>
      <li key={motion.id}>
        <MotionsListItem motion={motion} />
      </li>
    )}
  </ul>
);

MotionsList.propTypes = propTypes;

export default MotionsList;
