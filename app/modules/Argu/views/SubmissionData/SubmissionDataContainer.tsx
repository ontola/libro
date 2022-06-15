import { QuadPosition } from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import {
  FC,
  except,
  register,
  useQuadruples,
} from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import {
  alertDialogTopology,
  containerTopology,
  fullResourceTopology,
} from '../../../../topologies';
import AttributeList from '../../../../topologies/AttributeList';
import Card from '../../../../topologies/Card';
import AttributeListItem from '../../../Common/components/AttributeListItem';
import CardContent from '../../../Common/components/Card/CardContent';

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
