import './DetailVotedFor.scss';
import React, { PropTypes } from 'react';
import { Detail } from 'components';
import { sides } from 'components/shared/config';

const propTypes = {
  side: PropTypes.oneOf(sides).isRequired,
};

const DetailVotedFor = ({ side }) => {
  let className = 'DetailVotedFor';
  let icon = 'no-icon';
  let text = 'Onbekende stem';

  switch (side) {
    case 'pro':
      className = 'DetailVotedFor--pro';
      icon = 'thumbs-up';
      text = 'Stemde voor';
      break;
    case 'neutral':
      className = 'DetailVotedFor--neutral';
      icon = 'pause';
      text = 'Stemde neutraal';
      break;
    case 'con':
      className = 'DetailVotedFor--con';
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
