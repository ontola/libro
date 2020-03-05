import PropTypes from 'prop-types';
import React from 'react';

import { retrievePath } from '../../helpers/iris';

class NavigatableAction extends React.PureComponent {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
    onDone: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.onDoneHandler = this.onDoneHandler.bind(this);
  }

  onDoneHandler(response) {
    if (this.props.onDone) {
      this.props.onDone(response.iri);
    } else if (response.iri) {
      this.props.history.push(retrievePath(response.iri.value));
    }
  }
}

export default NavigatableAction;
