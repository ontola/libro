import { Property, linkType, register } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { Breadcrumb } from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import { parentTopology } from '../../topologies/Parent';

class ThingParent extends React.PureComponent {
  static type = NS.schema('Thing');

  static topology = parentTopology;

  static mapDataToProps = {
    name: {
      label: [NS.schema('name'), NS.as('name')],
    },
  };

  static propTypes = {
    name: linkType,
    showAncestors: PropTypes.bool,
  };

  static defaultProps = {
    showAncestors: true,
  };

  render() {
    return (
      <React.Fragment>
        {this.props.showAncestors && <Property label={NS.schema('isPartOf')} />}
        <Breadcrumb
          data-test="Thing-parent"
          label={<Property label={[NS.schema('name'), NS.as('name')]} />}
          title={this.props.name.value}
        />
      </React.Fragment>
    );
  }
}

export default register(ThingParent);
