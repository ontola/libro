import { EmptyRequestStatus, FulfilledRequestStatus } from 'link-lib';
import React from 'react';

import Button, {
  ButtonProps,
  ButtonTheme,
  ButtonVariant,
} from '../Button';

interface ButtonWithFeedbackProps {
  className?: string;
  feedbackIcon?: string;
  icon?: string;
  linkRequestStatus?: EmptyRequestStatus | FulfilledRequestStatus;
  variant: ButtonVariant;
  theme: ButtonTheme;
  onClick: () => Promise<any>;
}

const defaultProps = {
  feedbackIcon: 'loading',
};

/**
 * Wraps a Button component changing it's icon based on the promise status of the `onClick` return
 * value.
 */
const ButtonWithFeedback: React.FC<ButtonWithFeedbackProps> = (props) => {
  const {
    feedbackIcon,
    onClick,
  } = props;
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

  const buttonProps = {
    ...props,
    ...feedbackProps,
  };

  return <Button {...buttonProps} />;
};

ButtonWithFeedback.defaultProps = defaultProps;

export default ButtonWithFeedback;
