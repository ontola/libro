// import styles from './motionsList.scss';
import React, { PropTypes } from 'react';
import { MotionsListItem } from '../';
import _ from 'lodash/core';

function MotionsList({ data }) {
  return (
    <ul>
      {_.map(data, m =>
        <MotionsListItem key={m.identifier} motion={m} />
      )}
    </ul>
  );
}

MotionsList.propTypes = {
  data: PropTypes.array,
};

MotionsList.defaultProps = {
  data: [],
};

export default MotionsList;
