import React, { PropTypes } from 'react';

import { sides } from 'components/shared/config';

import Detail from '../Detail';

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
      text={text}
      icon={icon}
    />
  );
};

DetailVotedFor.propTypes = propTypes;

export default DetailVotedFor;
