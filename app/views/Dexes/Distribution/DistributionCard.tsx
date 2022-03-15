import * as dcterms from '@ontologies/dcterms';
import {
  Property,
  register,
  useGlobalIds,
} from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Button from '../../../components/Button';
import CardContent from '../../../components/Card/CardContent';
import CardDivider from '../../../components/Card/CardDivider';
import Heading, { HeadingSize } from '../../../components/Heading';
import { isDifferentWebsite } from '../../../helpers/iris';
import dcat from '../../../ontology/dcat';
import dexes from '../../../ontology/dexes';
import { cardTopology } from '../../../topologies/Card';
import { cardFixedTopology } from '../../../topologies/Card/CardFixed';
import { cardMainTopology } from '../../../topologies/Card/CardMain';
import { inlineTopology } from '../../../topologies/Inline';
import { messages } from '../messages';

const DistributionCard = () => {
  const [accessUrl] = useGlobalIds(dcat.accessURL);

  return (
    <CardContent endSpacing>
      <CardDivider margin />
      <Heading size={HeadingSize.SM}>
        <Property
          label={dcterms.format}
          topology={inlineTopology}
        />
      </Heading>
      {isDifferentWebsite(accessUrl) ? (
        <div>
          <Button
            href={accessUrl.value}
            icon="external-link"
          >
            <FormattedMessage {...messages.goToFile} />
          </Button>
        </div>
      ) : (
        <Property
          label={dcat.accessURL}
          topology={inlineTopology}
        />
      )}
      <Property label={dexes.offer}>
        <Property label={dexes.brokerUrl} />
      </Property>
    </CardContent>
  );
};

DistributionCard.type = dexes.Distribution;

DistributionCard.topology = [
  cardFixedTopology,
  cardMainTopology,
  cardTopology,
];

export default register(DistributionCard);
