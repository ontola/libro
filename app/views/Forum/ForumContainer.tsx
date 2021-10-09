import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import React from 'react';
import {
  FC,
  Property,
  register, 
} from 'link-redux';

import { connectHighlighting } from '../../containers/Highlight';
import CardContent from '../../components/Card/CardContent';
import argu from '../../ontology/argu';
import dbo from '../../ontology/dbo';
import ontola from '../../ontology/ontola';
import Card from '../../topologies/Card';
import CardRow from '../../topologies/Card/CardRow';
import { containerTopology } from '../../topologies/Container';

interface ForumContainerProps {
  highlighted?: boolean;
}

const ForumContainer: FC<ForumContainerProps> = ({ subject, highlighted }) => (
  <Card
    about={subject.value}
    shine={highlighted}
  >
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

ForumContainer.type = argu.ContainerNode;

ForumContainer.topology = containerTopology;

ForumContainer.hocs = [connectHighlighting];

export default register(ForumContainer);
