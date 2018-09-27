import { linkType, register } from 'link-redux';
import React from 'react';
import PropTypes from 'prop-types';

import Notification from '../../components/Notification';
import { NS } from '../../helpers/LinkedRenderStore';
import { allTopologies } from '../../topologies';

class Snackbar extends React.PureComponent {
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
      <Notification reset={this.props.close}>
        {this.props.text}
      </Notification>
    );
  }
}

export default register(Snackbar);
