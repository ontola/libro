import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import React from 'react';
import {
  FC,
  Property,
  register, 
} from 'link-redux';

import CardContent from '../../components/Card/CardContent';
import argu from '../../ontology/argu';
import dbo from '../../ontology/dbo';
import ontola from '../../ontology/ontola';
import { highlightContext } from '../../state/highlight';
import Card from '../../topologies/Card';
import CardRow from '../../topologies/Card/CardRow';
import { containerTopology } from '../../topologies/Container';

const ForumContainer: FC = ({ subject }) => {
  const { highlightState } = React.useContext(highlightContext);

  return (
    <Card
      about={subject.value}
      shine={subject.value === highlightState}
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
};

ForumContainer.type = argu.ContainerNode;

ForumContainer.topology = containerTopology;

export default register(ForumContainer);
