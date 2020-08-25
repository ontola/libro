import { lrsType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { isDifferentWebsite, retrievePath } from '../../helpers/iris';
import { redirectPage } from '../../middleware/reloading';

class NavigatableAction extends React.PureComponent {
  static propTypes = {
    history: PropTypes.shape({
      goBack: PropTypes.func,
      push: PropTypes.func,
    }).isRequired,
    lrs: lrsType,
    onDone: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.onDoneHandler = this.onDoneHandler.bind(this);
  }

  onDoneHandler(response) {
    if (this.props.onDone) {
      this.props.onDone(response.iri);
    } else if (isDifferentWebsite(response.iri)) {
      redirectPage(this.props.lrs, response.iri.value);
    } else if (response.iri) {
      this.props.history.push(retrievePath(response.iri.value));
    } else {
      this.props.history.goBack();
    }
  }
}

export default NavigatableAction;
