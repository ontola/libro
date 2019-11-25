import as from '@ontologies/as';
import schema from '@ontologies/schema';
import {
  Property,
  linkType,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { Breadcrumb } from '../../components';
import { parentTopology } from '../../topologies/Parent';

class ThingParent extends React.PureComponent {
  static type = schema.Thing;

  static topology = parentTopology;

  static mapDataToProps = {
    name: {
      label: [schema.name, as.name],
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
        {this.props.showAncestors && <Property label={schema.isPartOf} />}
        <Breadcrumb
          data-test="Thing-parent"
          label={<Property label={[schema.name, as.name]} />}
          title={this.props.name.value}
        />
      </React.Fragment>
    );
  }
}

export default register(ThingParent);
