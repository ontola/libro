import React from 'react';

import Button, { ButtonTheme, ButtonVariant } from '../Button';

import '../../topologies/Card/Card.scss';

interface CardButtonProps {
  action: () => any;
  active: boolean;
  type: ButtonVariant;
}

/**
 * Component to render a Card button. Uses the Button component under the hood.
 * @returns {component} Component
 */
const CardButton: React.FC<CardButtonProps> = ({
  action,
  active,
  children,
  type,
}) => {
  const buttonIcon = {
    comment: 'comment',
    con: 'thumbs-down',
    error: undefined,
    facebook: undefined,
    google: undefined,
    neutral: 'pause',
    no: 'thumbs-down',
    other: undefined,
    pro: 'thumbs-up',
    success: undefined,
    upvote: 'arrow-up',
    warning: undefined,
    yes: 'thumbs-up',
  };

  return (
    <Button
      active={active}
      icon={buttonIcon[type]}
      theme={ButtonTheme.Box}
      variant={type}
      onClick={() => action && action()}
    >
      {children}
    </Button>
  );
};

export default CardButton;
