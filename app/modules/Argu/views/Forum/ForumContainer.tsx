import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import dbo from '../../../../ontology/dbo';
import CardContent from '../../../Common/components/Card/CardContent';
import Card from '../../../Common/topologies/Card';
import CardRow from '../../../Common/topologies/Card/CardRow';
import { containerTopology } from '../../../Common/topologies/Container';
import { useHighlight } from '../../../Core/components/HighlightProvider/HighlightProvider';
import ontola from '../../../Core/ontology/ontola';
import argu from '../../lib/argu';

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
