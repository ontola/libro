import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';

import argu from '../../ontology/argu';

import './AttributeList.scss';

export const attributeListTopology = argu.ns('attributeList');

class AttributeList extends TopologyProvider {
  public propTypes = {
    children: PropTypes.node,
  };

  constructor(props: {}) {
    super(props);

    this.className = 'AttributeList';
    this.elementType = 'table';
    this.topology = attributeListTopology;
  }
}

export default AttributeList;
