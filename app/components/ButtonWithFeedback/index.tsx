import React, { ReactNode, SyntheticEvent } from 'react';

import Button from '../Button';

export interface ButtonWithFeedbackProps {
  children: ReactNode;
  feedbackIcon?: string;
  linkRequestStatus: {
    status: number;
  };
  onClick: (e: SyntheticEvent<any>) => Promise<void>;
}

type ButtonWithFeedbackPropsDefaulted = typeof ButtonWithFeedback.defaultProps & ButtonWithFeedbackProps;

interface ButtonWithFeedBackState {
  feedback: boolean;
}

/**
 * Wraps a Button component changing it's icon based on the promise status of the `onClick` return
 * value.
 */
class ButtonWithFeedback extends React.Component<ButtonWithFeedbackPropsDefaulted, ButtonWithFeedBackState> {
  public static defaultProps = {
    feedbackIcon: 'loading',
  };

  constructor(props: ButtonWithFeedbackPropsDefaulted) {
    super(props);

    this.state = {
      feedback: false,
    };

    this.feedback = this.feedback.bind(this);
  }

  public feedback(e: SyntheticEvent<any>) {
    this.setState({ feedback: true });
    this.props
        .onClick(e)
        .finally(() => {
          this.setState({ feedback: false });
        });
  }

  public render() {
    let loading;
    let icon;
    if (this.props.feedbackIcon === 'loading') {
      loading = this.state.feedback;
    } else if (this.state.feedback) {
      icon = this.props.feedbackIcon;
    }
    const buttonProps = {
      ...this.props,
      icon,
      loading,
      onClick: this.feedback,
    };

    return <Button {...buttonProps} />;
  }
}
export default ButtonWithFeedback;
