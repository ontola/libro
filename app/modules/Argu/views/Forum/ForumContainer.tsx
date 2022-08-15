import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import dbo from '../../../Common/ontology/dbo';
import CardContent from '../../../Common/components/Card/CardContent';
import { containerTopology } from '../../../Common/topologies';
import Card from '../../../Common/topologies/Card';
import CardRow from '../../../Common/topologies/Card/CardRow';
import { useHighlight } from '../../../Common/components/HighlightProvider/HighlightProvider';
import ontola from '../../../Kernel/ontology/ontola';
import argu from '../../ontology/argu';

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
