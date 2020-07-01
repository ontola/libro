import { Set } from 'immutable';
import {
  linkType,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import Omniform from '../../../../components/Omniform';

class OmniformConnector extends React.PureComponent {
  static propTypes = {
    autofocusForm: PropTypes.bool,
    closeForm: PropTypes.func,
    formFooterButtons: PropTypes.node,
    onDone: PropTypes.func,
    onKeyUp: PropTypes.func,
    potentialAction: linkType,
    subject: subjectType,
  };

  keynameSafeIRI() {
    return btoa(this.props.subject.value);
  }

  render() {
    return (
      <Omniform
        actions={new Set(this.props.potentialAction)}
        autofocusForm={this.props.autofocusForm}
        closeForm={this.props.closeForm}
        formFooterButtons={this.props.formFooterButtons}
        parentIRI={this.keynameSafeIRI()}
        onDone={this.props.onDone}
        onKeyUp={this.props.onKeyUp}
      />
    );
  }
}

export default OmniformConnector;
