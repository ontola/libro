import React, { EventHandler } from 'react';

import Button, { ButtonTheme, ButtonVariant } from '../Button';

import '../../topologies/Card/Card.scss';

export interface CardButtonProps {
  action?: EventHandler<any>;
  active?: boolean;
  type?: ButtonVariant;
}

/**
 * Component to render a Card button. Uses the Button component under the hood.
 */
const CardButton: React.FC<CardButtonProps> = ({
  action,
  active,
  children,
  type,
}) => {
  const buttonIconMap = new Map<ButtonVariant, string>([
    [ButtonVariant.Comment, 'comment'],
    [ButtonVariant.Con, 'thumbs-down'],
    [ButtonVariant.Neutral, 'pause'],
    [ButtonVariant.No, 'thumbs-down'],
    [ButtonVariant.Pro, 'thumbs-up'],
    [ButtonVariant.Upvote, 'arrow-up'],
    [ButtonVariant.Yes, 'thumbs-up'],
  ]);

  return (
    <Button
      active={active}
      icon={type && buttonIconMap.has(type) ? buttonIconMap.get(type) : ''}
      theme={ButtonTheme.Box}
      variant={type}
      onClick={(e) => action && action(e)}
    >{children}
    </Button>
  );
};

export default CardButton;
