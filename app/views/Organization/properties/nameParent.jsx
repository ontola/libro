import { linkedPropType, register } from 'link-redux';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { NS } from '../../../helpers/LinkedRenderStore';
import { getSideBarColor } from '../../../state/sideBars/selectors';
import { parentTopology } from '../../../topologies/Parent/index';

const mapStateToProps = state => ({ color: getSideBarColor(state) });

class OrganizationNameParent extends React.PureComponent {
  static type = [NS.schema('Organization'), NS.argu('Page')];

  static property = [
    NS.schema('name'),
    NS.rdfs('label'),
    NS.foaf('name'),
  ];

  static topology = parentTopology;

  static hocs = [
    connect(mapStateToProps),
  ];

  static propTypes = {
    color: PropTypes.string,
    linkedProp: linkedPropType,
  };

  render() {
    const { linkedProp } = this.props;

    return (
      <span
        style={{
          color: this.props.color,
          fontWeight: 'bold',
        }}
      >
        {linkedProp.value}
      </span>
    );
  }
}

export default register(OrganizationNameParent);
