// @flow
import './detailType.scss';
import React, { PropTypes } from 'react';
import { Detail } from '../';

const propTypes = {
  status: PropTypes.oneOf([
    'idea',
    'motion',
    'question',
    'document',
    'argumentPro',
    'argumentCon',
    'project',
  ]),
  voteData: PropTypes.node,
};

const defaultProps = {
  status: 'unknown',
};

function DetailType({ type }) {

  let className = '';
  let icon = 'cross';
  let text = 'No type';

  switch (type) {
    case 'idea':
      className = 'detailType--motion';
      icon = 'lightbulb-o';
      text = 'Idee';
      break;
    case 'motion':
      className = 'detailType--motion';
      icon = 'lightbulb-o';
      text = 'Motie';
      break;
    default:
      break;
  }

  return (
    <Detail className={`detailType ${className}`} text={text} icon={icon} />
  );
}

DetailType.propTypes = propTypes;
DetailType.defaultProps = defaultProps;

export default DetailType;
