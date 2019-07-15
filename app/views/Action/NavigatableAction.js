import PropTypes from 'prop-types';
import React from 'react';

import { History } from '../../helpers/history';
import { retrievePath } from '../../helpers/iris';

class NavigatableAction extends React.PureComponent {
  static propTypes = {
    history: PropTypes.instanceOf(History).isRequired,
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
      this.props.history.push(retrievePath(response.iri.value));
    }
  }
}

export default NavigatableAction;
