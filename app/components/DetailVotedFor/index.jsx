import PropTypes from 'prop-types';
import React from 'react';

import Detail from '../Detail';
import { sides } from '../shared/config';

import './DetailVotedFor.scss';

const propTypes = {
  side: PropTypes.oneOf(sides).isRequired,
};

const DetailVotedFor = ({ side }) => {
  let className = 'DetailVotedFor';
  let icon = 'no-icon';
  let text = 'Onbekende stem';

  switch (side) {
    case 'yes':
      className = 'DetailVotedFor--yes';
      icon = 'thumbs-up';
      text = 'Stemde voor';
      break;
    case 'neutral':
      className = 'DetailVotedFor--neutral';
      icon = 'pause';
      text = 'Stemde neutraal';
      break;
    case 'no':
      className = 'DetailVotedFor--no';
      icon = 'thumbs-down';
      text = 'Stemde tegen';
      break;
    default:
      className = 'DetailVotedFor';
      break;
  }

  return (
    <Detail
      className={className}
      icon={icon}
      text={text}
    />
  );
};

DetailVotedFor.propTypes = propTypes;

export default DetailVotedFor;
