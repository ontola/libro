// @flow
import './detailStatus.scss';
import React, { PropTypes } from 'react';

const propTypes = {
  status: PropTypes.oneOf([
    'pass',
    'fail',
    'unknown',
  ]),
  voteData: PropTypes.node,
};

const defaultProps = {
  status: 'unknown',
};

function DetailStatus({ status, voteData }) {

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
    <span className={"detail " + className}>
      <span className={"detail--icon fa fa-" + icon.toString()} />
      <span className="detail--text">{text}</span>
    </span>
  );
}

DetailStatus.propTypes = propTypes;
DetailStatus.defaultProps = defaultProps;

export default DetailStatus;
