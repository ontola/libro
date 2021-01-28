import * as rdfs from '@ontologies/rdfs';
import * as xsd from '@ontologies/xsd';
import { linkedPropType, register } from 'link-redux';
import { defineMessages, useIntl } from 'react-intl';

import { allTopologies } from '../../../topologies';

const booleanTranslation = defineMessages({
  false: {
    defaultMessage: 'No',
    id: 'https://app.argu.co/i18n/xsd:boolean/false',
  },
  true: {
    defaultMessage: 'Yes',
    id: 'https://app.argu.co/i18n/xsd:boolean/true',
  },
});

const BooleanRenderer = ({ linkedProp }) => {
  const intl = useIntl();

  return intl.formatMessage(booleanTranslation[linkedProp.value]);
};

BooleanRenderer.type = rdfs.Literal;

BooleanRenderer.topology = allTopologies;

BooleanRenderer.property = xsd.xsdboolean;

BooleanRenderer.propTypes = {
  linkedProp: linkedPropType,
};

export default register(BooleanRenderer);
