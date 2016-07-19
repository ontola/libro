// @flow
import './motionsList.scss';
import React, { PropTypes } from 'react';
import { MotionsListItem } from '../';
import { MotionMap } from '../../models/Motion';

const propTypes = {
  motions: PropTypes.instanceOf(MotionMap).isRequired,
};

const MotionsList = ({ motions }) => (
  <ul>
    {motions.map((motion) =>
      <li key={motion.get('id')}>
        <MotionsListItem motion={motion} />
      </li>
    ).toArray()}
  </ul>
);

MotionsList.propTypes = propTypes;

export default MotionsList;
