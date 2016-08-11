// @flow
import './detailType.scss';
import React, { PropTypes } from 'react';
import { Detail } from '../';

const propTypes = {
  type: PropTypes.oneOf([
    'idea',
    'motion',
    'question',
    'document',
    'argumentPro',
    'argumentCon',
    'project',
    'unknown',
  ]),
  voteData: PropTypes.node,
};

const defaultProps = {
  type: 'unknown',
};

function DetailType({ type }) {
  let className = null;
  let icon = 'cross';
  let text = 'No type';
  let title = null;

  switch (type) {
    case 'idea':
      className = 'detailType--motion';
      icon = 'lightbulb-o';
      text = 'Idee';
      title = 'Een idee is een concreet voorstel met voordelen en nadelen.';
      break;
    case 'motion':
      className = 'detailType--motion';
      icon = 'lightbulb-o';
      text = 'Motie';
      title = 'Een motie is een voorstel van de raad.';
      break;
    default:
      break;
  }

  return (
    <Detail
      className={`detailType ${className}`}
      text={text}
      icon={icon}
      title={title}
    />
  );
}

DetailType.propTypes = propTypes;
DetailType.defaultProps = defaultProps;

export default DetailType;
