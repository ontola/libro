// @flow
import './motionsList.scss';
import React, { PropTypes } from 'react';
import { MotionsListItem } from '../';

const propTypes = {
  data: PropTypes.array.isRequired,
};

const defaultProps = {
  data: [],
};

const MotionsList = ({ data }) => (
  <ul>
  {data.map(motion => (
    <li key={motion.identifier}>
      <MotionsListItem motion={motion} />
    </li>
  ))}
  </ul>
);

MotionsList.propTypes = propTypes;
MotionsList.defaultProps = defaultProps;

export default MotionsList;
