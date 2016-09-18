import './DetailType.scss';
import React, { PropTypes } from 'react';
import { Detail } from 'components';
import { types } from 'components/shared/config';

const propTypes = {
  type: PropTypes.oneOf(types).isRequired,
};

const DetailType = ({ type }) => {
  let className = null;
  let icon = 'cross';
  let text = 'No type';
  let title = null;

  switch (type) {
    case 'idea':
      className = 'DetailType--motion';
      icon = 'lightbulb-o';
      text = 'Idee';
      title = 'Een idee is een concreet voorstel met voordelen en nadelen.';
      break;
    case 'motion':
      className = 'DetailType--motion';
      icon = 'lightbulb-o';
      text = 'Motie';
      title = 'Een motie is een voorstel van de raad.';
      break;
    default:
      icon = 'file-o';
      text = type;
      break;
  }

  return (
    <Detail
      className={`DetailType ${className}`}
      text={text}
      icon={icon}
      title={title}
    />
  );
};

DetailType.propTypes = propTypes;

export default DetailType;
