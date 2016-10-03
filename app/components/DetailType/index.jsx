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
    case 'challenge':
      className = 'DetailType--question';
      icon = 'question';
      text = 'Uitdaging';
      title = 'Een uitdaging is een probleem waar ideeën op kunnen worden ingediend.';
      break;
    case 'meeting':
      className = 'DetailType--meeting';
      icon = 'calendar';
      text = 'Vergadering';
      title = 'Een vergadering is een bijeenkomst waar besluiten worden gemaakt.';
      break;
    case 'attachment':
      className = 'DetailType--attachment';
      icon = 'file';
      text = 'Bijlage';
      title = 'Een bijlage is een bestand dat bij een vergaderpunt hoort.';
      break;
    case 'argumentPro':
      className = 'DetailType--pro';
      icon = 'plus';
      text = 'Argument voor';
      title = 'Een argument voor is een reden om voor het idee te zijn.';
      break;
    case 'argumentCon':
      className = 'DetailType--con';
      icon = 'minus';
      text = 'Argument tegen';
      title = 'Een tegenargument is een reden om tegen het idee te zijn.';
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
