import PropTypes from 'prop-types';
import React from 'react';

import Detail from '../Detail';
import { types } from '../shared/config';

import './DetailType.scss';

const propTypes = {
  // Optional string that adds extra information on the subtype, such as 'motion'. Overwrites type.
  classification: PropTypes.string,
  type: PropTypes.oneOf(types).isRequired,
};

const DetailType = ({
  classification,
  type,
}) => {
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
      title = 'Een motie is een voorstel om iets door een overheid te laten uitvoeren.';
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
    case 'article':
      className = 'DetailType--con';
      icon = 'file-o';
      text = 'Artikel';
      title = 'Een artikel is een geschreven stuk tekst.';
      break;
    default:
      className = 'DetailType--other';
      icon = 'file-o';
      text = type;
      break;
  }

  return (
    <Detail
      className={`DetailType ${className}`}
      icon={icon}
      text={classification || text}
      title={classification || title}
    />
  );
};

DetailType.propTypes = propTypes;

export default DetailType;
