import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';

import { NS } from '../../helpers/LinkedRenderStore';

import './AttributeList.scss';

export const attributeListTopology = NS.argu('attributeList');

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
