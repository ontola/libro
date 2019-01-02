import { linkType, register } from 'link-redux';
import React from 'react';
import PropTypes from 'prop-types';

import SnackbarComponent from '../../components/Snackbar';
import { NS } from '../../helpers/LinkedRenderStore';
import { allTopologies } from '../../topologies';

class SnackbarView extends React.PureComponent {
  static type = NS.ontola('snackbar/Snackbar');

  static topology = allTopologies;

  static mapDataToProps = [NS.schema('text')];

  static linkOpts = { returnType: 'value' };

  static propTypes = {
    close: PropTypes.func,
    text: linkType,
  };

  render() {
    return (
      <SnackbarComponent close={this.props.close}>
        {this.props.text}
      </SnackbarComponent>
    );
  }
}

export default [
  register(SnackbarView),
];
