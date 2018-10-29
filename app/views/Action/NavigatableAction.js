import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { retrievePath } from '../../helpers/iris';

const mapDispatchToProps = dispatch => ({
  navigate: iri => dispatch(push(retrievePath(iri))),
});

export const bindNavigateProp = connect(null, mapDispatchToProps);

class NavigatableAction extends React.PureComponent {
  static propTypes = {
    navigate: PropTypes.func.isRequired,
    onDone: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.onDoneHandler = this.onDoneHandler.bind(this);
  }

  onDoneHandler(response) {
    if (this.props.onDone) {
      this.props.onDone(response.iri);
    } else {
      this.props.navigate(response.iri.value);
    }
  }
}

export default NavigatableAction;
