// @flow
import './detailStatus.scss';
import React, { PropTypes } from 'react';
import { Detail } from 'components';

const propTypes = {
  status: PropTypes.oneOf([
    'pass',
    'fail',
  ]).isRequired,
};

const DetailStatus = ({ status }) => {
  let className = 'DetailStatus';
  let icon = 'no-icon';
  let text = 'Onbekende status';

  switch (status) {
    case 'pass':
      className = 'DetailStatus--pass';
      icon = 'check';
      text = 'Aangenomen';
      break;
    case 'fail':
      className = 'DetailStatus--fail';
      icon = 'close';
      text = 'Verworpen';
      break;
    default:
      className = 'DetailStatus';
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

export default DetailStatus;
