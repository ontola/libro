// @flow
import './detailStatus.scss';
import React, { PropTypes } from 'react';
import { Detail } from 'components';

const propTypes = {
  status: PropTypes.oneOf([
    'pass',
    'fail',
  ]),
};

const defaultProps = {
  status: 'unknown',
};

const DetailStatus = ({ status }) => {
  let className = 'defaultClassName';
  let icon = 'no-icon';
  let text = 'Onbekende status';

  switch (status) {
    case 'pass':
      className = 'detailStatus--pass';
      icon = 'check';
      text = 'Aangenomen';
      break;
    case 'fail':
      className = 'detailStatus--fail';
      icon = 'close';
      text = 'Verworpen';
      break;
    default:
      className = 'default';
      break;
  }

  return (
    <Detail
      className={className}
      text={text}
      icon={icon}
    />
  );
};

DetailStatus.propTypes = propTypes;
DetailStatus.defaultProps = defaultProps;

export default DetailStatus;
