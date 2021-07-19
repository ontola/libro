import * as rdfx from '@ontologies/rdf';
import {
  FC,
  register,
  useQuads,
} from 'link-redux';
import React from 'react';

import AttributeListItem from '../../components/AttributeListItem';
import CardContent from '../../components/Card/CardContent';
import argu from '../../ontology/argu';
import AttributeList from '../../topologies/AttributeList';
import Card from '../../topologies/Card';
import { containerTopology } from '../../topologies/Container';
import { alertDialogTopology } from '../../topologies/Dialog';
import { fullResourceTopology } from '../../topologies/FullResource';

const SubmissionDataContainer: FC = () => {
  const properties = useQuads([rdfx.type]);

  return (
    <Card>
      <CardContent noSpacing>
        <AttributeList>
          {properties.map((property) => (
            <AttributeListItem
              key={property.predicate.value}
              label={property.predicate}
              onError={() => null}
            />
          ))}
        </AttributeList>
      </CardContent>
    </Card>
  );
};

SubmissionDataContainer.type = argu.SubmissionData;

SubmissionDataContainer.topology = [
  alertDialogTopology,
  fullResourceTopology,
  containerTopology,
];

export default register(SubmissionDataContainer);
