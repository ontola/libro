import PropTypes from 'prop-types';
import React from 'react';

import Button from '../Button';

import './Card.scss';

const propTypes = {
  action: PropTypes.func.isRequired,
  active: PropTypes.bool,
  children: PropTypes.string.isRequired,
  type: PropTypes.string,
};

/**
 * Component to render a Card button. Uses the Button component under the hood.
 * @returns {component} Component
 */
const CardButton = ({
  action,
  active,
  children,
  type,
}) => {
  const buttonIcon = {
    comment: 'comment',
    con: 'thumbs-down',
    neutral: 'pause',
    no: 'thumbs-down',
    pro: 'thumbs-up',
    upvote: 'arrow-up',
    yes: 'thumbs-up',
  };

  return (
    <Button
      active={active}
      icon={buttonIcon[type]}
      theme="box"
      variant={type}
      onClick={() => action()}
    >{children}
    </Button>
  );
};

CardButton.propTypes = propTypes;

export default CardButton;
