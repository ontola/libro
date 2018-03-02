import PropTypes from 'prop-types';
import React from 'react';

import { Button } from '../../components';

import { titleForStatus } from './ErrorMessages';

const propTypes = {
  children: PropTypes.node,
  linkRequestStatus: PropTypes.shape({
    status: PropTypes.number,
  }),
  location: PropTypes.string,
  reloadLinkedObject: PropTypes.func,
};

class ErrorButtonWithFeedback extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
    };

    this.reload = this.reload.bind(this);
  }

  reload() {
    this.setState({ loading: true });
    this
      .props
      .reloadLinkedObject()
      .then(() => { this.setState({ loading: false }); });
  }

  render() {
    const { linkRequestStatus } = this.props;

    return (
      <Button
        icon="repeat"
        loading={this.state.loading}
        title={titleForStatus(linkRequestStatus)}
        onClick={this.reload}
        {...this.props}
      >
        {this.props.children || 'Opnieuw'}
      </Button>
    );
  }
}

ErrorButtonWithFeedback.propTypes = propTypes;

export default ErrorButtonWithFeedback;
