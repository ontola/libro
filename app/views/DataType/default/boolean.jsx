import * as rdfs from '@ontologies/rdfs';
import * as xsd from '@ontologies/xsd';
import { linkedPropType, register } from 'link-redux';
import { useIntl } from 'react-intl';

import { allTopologies } from '../../../topologies';
import { typeTranslation } from '../../../translations/messages';

const BooleanRenderer = ({ linkedProp }) => {
  const intl = useIntl();

  return intl.formatMessage(typeTranslation[linkedProp.value]);
};

BooleanRenderer.type = rdfs.Literal;

BooleanRenderer.topology = allTopologies;

BooleanRenderer.property = xsd.xsdboolean;

BooleanRenderer.propTypes = {
  linkedProp: linkedPropType,
};

export default register(BooleanRenderer);
