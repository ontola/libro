import { Literal } from '@ontologies/core';
import * as rdfs from '@ontologies/rdfs';
import * as xsd from '@ontologies/xsd';
import { FC, register } from 'link-redux';
import React from 'react';
import { useIntl } from 'react-intl';

import { allTopologies } from '../../../../../topologies';
import { booleanTranslation } from '../../../../../translations/messages';

interface BooleanLiteral extends Literal {
  value: 'true' | 'false'
}

interface BooleanProps {
  linkedProp: BooleanLiteral;
}

const BooleanRenderer: FC<BooleanProps> = ({ linkedProp }) => {
  const intl = useIntl();

  return (
    <React.Fragment>
      {intl.formatMessage(booleanTranslation[linkedProp.value])}
    </React.Fragment>
  );
};

BooleanRenderer.type = rdfs.Literal;

BooleanRenderer.topology = allTopologies;

BooleanRenderer.property = xsd.xsdboolean;

export default register(BooleanRenderer);
