import './Card.scss';
import React, { PropTypes } from 'react';
import { Button } from 'components';

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
    yes: 'thumbs-up',
    neutral: 'pause',
    no: 'thumbs-down',
    comment: 'comment',
    upvote: 'arrow-up',
  };

  return (
    <Button
      active={active}
      icon={buttonIcon[type]}
      onClick={() => action()}
      theme="box"
      variant={type}
    >{children}</Button>
  );
};

CardButton.propTypes = propTypes;

export default CardButton;
