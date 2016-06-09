// @flow
// import styles from './motionsList.scss';
import React, { PropTypes } from 'react';
import { MotionsListItem } from '../';

const propTypes = {
  data: PropTypes.array,
};

const defaultProps = {
  data: [],
};

function MotionsList({ data }) {
  return (
    <div>
      {data.map(m =>
        <MotionsListItem key={m.identifier} motion={m} />
      )}
    </div>
  );
}

MotionsList.propTypes = propTypes;
MotionsList.defaultProps = defaultProps;

export default MotionsList;
