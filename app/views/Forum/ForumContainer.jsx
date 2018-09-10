import React from 'react';
import { Property, register, subjectType } from 'link-redux';

import { connectHighlighting, hightlightType } from '../../containers/Highlight';
import {
  CardContent,
} from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import Card from '../../topologies/Card';
import DetailsBar from '../../topologies/DetailsBar';

class ForumContainer extends React.PureComponent {
  static type = NS.argu('Forum');

  static topology = NS.argu('container');

  static hocs = [connectHighlighting];

  static propTypes = {
    highlighted: hightlightType,
    subject: subjectType,
  };

  render() {
    const { subject, highlighted } = this.props;

    return (
      <Card about={subject.value} shine={highlighted}>
        <Property label={NS.argu('coverPhoto')} />
        <CardContent noSpacing>
          <Property label={[NS.schema('name'), NS.rdfs('label')]} />
          <DetailsBar>
            <Property label={NS.schema('creator')} />
            <Property label={NS.schema('dateCreated')} />
          </DetailsBar>
          <Property label={[NS.schema('text'), NS.schema('description'), NS.dbo('abstract')]} />
        </CardContent>
      </Card>
    );
  }
}

export default register(ForumContainer);
