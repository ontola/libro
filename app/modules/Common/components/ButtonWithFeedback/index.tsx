import { EmptyRequestStatus, FulfilledRequestStatus } from 'link-lib';
import React from 'react';

import Button, { ButtonProps } from '../Button';

export interface ButtonWithFeedbackProps extends ButtonProps {
  feedbackIcon?: string;
  linkRequestStatus?: EmptyRequestStatus | FulfilledRequestStatus;
  onClick: () => Promise<any>;
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

  const handleClick = React.useCallback(() => {
    setFeedback(true);

    onClick().finally(() => {
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