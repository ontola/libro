import { EmptyRequestStatus, FulfilledRequestStatus } from 'link-lib';
import React, { MouseEvent, MouseEventHandler } from 'react';

import Button, { ButtonProps } from '../Button';

export type ButtonWithFeedbackHandler = (e: MouseEvent<Element>) => Promise<any>;

export interface ButtonWithFeedbackProps extends ButtonProps {
  feedbackIcon?: string;
  linkRequestStatus?: EmptyRequestStatus | FulfilledRequestStatus;
  onClick: ButtonWithFeedbackHandler;
}

const defaultProps = {
  feedbackIcon: 'loading',
};

/**
 * Wraps a Button component changing it's icon based on the promise status of the `onClick` return
 * value.
 */
const ButtonWithFeedback: React.FC<ButtonWithFeedbackProps> = ({ feedbackIcon, onClick, ...buttonProps }) => {
  const [feedback, setFeedback] = React.useState(false);

  const handleClick = React.useCallback<MouseEventHandler>((e) => {
    setFeedback(true);

    onClick(e).finally(() => {
      setFeedback(false);
    });
  }, [onClick]);

  const feedbackProps: ButtonProps = {
    onClick: handleClick,
  };

  if (feedbackIcon === 'loading') {
    feedbackProps.loading = feedback;
  } else if (feedback) {
    feedbackProps.icon = feedbackIcon;
  }

  return (
    <Button
      {...buttonProps}
      {...feedbackProps}
    />
  );
};

ButtonWithFeedback.defaultProps = defaultProps;

export default ButtonWithFeedback;
