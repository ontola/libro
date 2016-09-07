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
 * Component to specifically render a Card button. Uses the Button component under the hood.
 * @returns {component} Component
 */
const CardButton = ({
  action,
  active,
  children,
  type,
}) => {
  const buttonIcon = {
    pro: 'thumbs-up',
    neutral: 'pause',
    con: 'thumbs-down',
    comment: 'comment',
    upvote: 'arrow-up',
  };

  return (
    <Button
      active={active}
      children={children}
      icon={buttonIcon[type]}
      onClick={() => action()}
      theme="box"
      variant={type}
    />
  );
};

CardButton.propTypes = propTypes;

export default CardButton;
