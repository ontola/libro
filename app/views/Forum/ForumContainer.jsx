import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import React from 'react';
import {
  Property,
  register,
  subjectType,
} from 'link-redux';

import { connectHighlighting, hightlightType } from '../../containers/Highlight';
import CardContent from '../../components/Card/CardContent';
import argu from '../../ontology/argu';
import dbo from '../../ontology/dbo';
import ontola from '../../ontology/ontola';
import Card from '../../topologies/Card';
import CardRow from '../../topologies/Card/CardRow';
import { containerTopology } from '../../topologies/Container';

class ForumContainer extends React.PureComponent {
  static type = argu.ContainerNode;

  static topology = containerTopology;

  static hocs = [connectHighlighting];

  static propTypes = {
    highlighted: hightlightType,
    subject: subjectType,
  };

  render() {
    const { subject, highlighted } = this.props;

    return (
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
  }
}

export default register(ForumContainer);
