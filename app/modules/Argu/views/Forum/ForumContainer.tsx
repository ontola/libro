import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import dbo from '../../../../ontology/dbo';
import ontola from '../../../../ontology/ontola';
import { containerTopology } from '../../../../topologies';
import Card from '../../../../topologies/Card';
import CardRow from '../../../../topologies/Card/CardRow';
import CardContent from '../../../Common/components/Card/CardContent';
import { useHighlight } from '../../../Core/components/HighlightProvider/HighlightProvider';

const ForumContainer: FC = ({ subject }) => {
  const { highlightState } = useHighlight();

  return (
    <Card shine={subject.value === highlightState}>
      <Property label={ontola.coverPhoto} />
      <CardContent noSpacing>
        <Property label={[schema.name, rdfs.label]} />
        <Property label={[schema.text, schema.description, dbo.abstract]} />
      </CardContent>
      <CardRow backdrop>
        <CardContent>
          <Property
            direction="column"
            label={argu.discussions}
          />
        </CardContent>
      </CardRow>
    </Card>
  );
};

ForumContainer.type = argu.ContainerNode;

ForumContainer.topology = containerTopology;

export default register(ForumContainer);
