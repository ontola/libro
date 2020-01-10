import PropTypes from 'prop-types';
import React from 'react';

import Button from '../Button';

const propTypes = {
  children: PropTypes.node,
  feedbackIcon: PropTypes.string,
  linkRequestStatus: PropTypes.shape({
    status: PropTypes.number,
  }),
  onClick: PropTypes.func,
};

const defaultProps = {
  feedbackIcon: 'loading',
};

/**
 * Wraps a Button component changing it's icon based on the promise status of the `onClick` return
 * value.
 */
class ButtonWithFeedback extends React.Component {
  constructor() {
    super();

    this.state = {
      feedback: false,
    };

    this.feedback = this.feedback.bind(this);
  }

  feedback() {
    this.setState({ feedback: true });
    this
      .props
      .onClick()
      .finally(() => {
        this.setState({ feedback: false });
      });
  }

  render() {
    const feedbackProps = {
      onClick: this.feedback,
    };
    if (this.props.feedbackIcon === 'loading') {
      feedbackProps.loading = this.state.feedback;
    } else if (this.state.feedback) {
      feedbackProps.icon = this.props.feedbackIcon;
    }
    const buttonProps = {
      ...this.props,
      ...feedbackProps,
    };


    return <Button {...buttonProps} />;
  }
}

ButtonWithFeedback.defaultProps = defaultProps;
ButtonWithFeedback.propTypes = propTypes;

export default ButtonWithFeedback;
