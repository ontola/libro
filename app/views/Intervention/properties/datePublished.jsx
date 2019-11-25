import schema from '@ontologies/schema';
import {
  linkedPropType,
  register,
} from 'link-redux';

import { NS } from '../../../helpers/LinkedRenderStore';
import { attributeListTopology } from '../../../topologies/AttributeList';

const DatePublished = ({ linkedProp }) => (
  linkedProp.value.split('T')[0]
);

DatePublished.type = NS.rivm('Intervention');

DatePublished.topology = attributeListTopology;

DatePublished.property = schema.datePublished;

DatePublished.propTypes = {
  linkedProp: linkedPropType,
};

export default register(DatePublished);
