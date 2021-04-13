import * as schema from '@ontologies/schema';
import {
  linkedPropType,
  register,
} from 'link-redux';
import { useIntl } from 'react-intl';

import rivm from '../../../../ontology/rivm';
import { attributeListTopology } from '../../../../topologies/AttributeList';


const DatePublished = ({ linkedProp }) => {
  const intl = useIntl();

  return intl.formatDate(linkedProp.value);
};

DatePublished.type = rivm.Intervention;

DatePublished.topology = attributeListTopology;

DatePublished.property = schema.datePublished;

DatePublished.propTypes = {
  linkedProp: linkedPropType,
};

export default register(DatePublished);
