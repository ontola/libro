// import styles from './motionsList.scss';
import React, { PropTypes } from 'react';
import { MotionsListItem } from '../';

function MotionsList({ data }) {
  return (
    <div>
      {data.map(m =>
        <MotionsListItem key={m.identifier} motion={m} />
      )}
    </div>
  );
}

MotionsList.propTypes = {
  data: PropTypes.array,
};

MotionsList.defaultProps = {
  data: [],
};

export default MotionsList;
