import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';

import argu from '../../ontology/argu';

import './AttributeList.scss';

export const attributeListTopology = argu.ns('attributeList');

class AttributeList extends TopologyProvider {
  constructor() {
    super();

    this.className = 'AttributeList';
    this.elementType = 'table';
    this.topology = attributeListTopology;
  }
}

AttributeList.propTypes = {
  children: PropTypes.node,
};

export default AttributeList;
