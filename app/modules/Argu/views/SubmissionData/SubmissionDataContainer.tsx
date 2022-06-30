import { QuadPosition } from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import {
  FC,
  except,
  register,
  useQuadruples,
} from 'link-redux';
import React from 'react';

import AttributeListItem from '../../../Common/components/AttributeListItem';
import CardContent from '../../../Common/components/Card/CardContent';
import AttributeList from '../../../Common/topologies/AttributeList';
import Card from '../../../Common/topologies/Card';
import { containerTopology } from '../../../Common/topologies/Container';
import { alertDialogTopology } from '../../../Common/topologies/Dialog';
import { fullResourceTopology } from '../../../Common/topologies/FullResource';
import argu from '../../lib/argu';

const SubmissionDataContainer: FC = () => {
  const properties = useQuadruples(except(rdfx.type));

  return (
    <Card>
      <CardContent noSpacing>
        <AttributeList>
          {properties.map((property) => (
            <AttributeListItem
              key={property[QuadPosition.predicate].value}
              label={property[QuadPosition.predicate]}
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
