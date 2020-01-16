import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import {
  Property,
  register,
  subjectType,
} from 'link-redux';
import React from 'react';

import { CardContent } from '../../components';
import { hightlightType } from '../../containers/Highlight';
import { NS } from '../../helpers/LinkedRenderStore';
import app from '../../ontology/app';
import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import ActionsBar from '../../topologies/ActionsBar';
import Card from '../../topologies/Card';
import CardAppendix from '../../topologies/Card/CardAppendix';
import { containerTopology } from '../../topologies/Container';

class ArgumentContainer extends React.PureComponent {
  static type = [
    argu.Argument,
    argu.ProArgument,
    argu.ConArgument,
  ];

  static topology = containerTopology;

  static propTypes = {
    highlighted: hightlightType,
    subject: subjectType,
  };

  render() {
    const { highlighted, subject } = this.props;

    return (
      <Card about={subject.value} shine={highlighted}>
        <Property label={ontola.coverPhoto} />
        <CardContent noSpacing>
          <Property label={[schema.name, rdfs.label]} />
          <Property label={[schema.text, schema.description, NS.dbo('abstract')]} />
        </CardContent>
        <ActionsBar>
          <Property label={ontola.favoriteAction} />
        </ActionsBar>
        <CardAppendix>
          <Property label={argu.ns('voteableVoteEvent')} />
          <Property label={argu.ns('topComment')} />
          <Property clickToOpen forceRender label={app.omniform} />
        </CardAppendix>
      </Card>
    );
  }
}

export default register(ArgumentContainer);
