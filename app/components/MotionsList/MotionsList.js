//import styles from './motionsList.scss';
import React from 'react';
import { MotionsListItem } from '../';
import _ from 'lodash/core';

export default class MotionsList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul>
        {_.map(this.props.motions, m =>
            <MotionsListItem key={m.identifier} motion={m} />
        )}
      </ul>
    );
  }
}

MotionsList.propTypes = {
  motions: React.PropTypes.array
};

export default MotionsList;
