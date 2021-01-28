import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  Property,
  register,
  subjectType,
} from 'link-redux';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import { hightlightType } from '../../containers/Highlight';
import app from '../../ontology/app';
import argu from '../../ontology/argu';
import dbo from '../../ontology/dbo';
import ontola from '../../ontology/ontola';
import ActionsBar from '../../topologies/ActionsBar';
import Card from '../../topologies/Card';
import CardAppendix from '../../topologies/Card/CardAppendix';
import { containerTopology } from '../../topologies/Container';
import { alertDialogTopology } from '../../topologies/Dialog';

class ArgumentContainer extends React.PureComponent {
  static type = [
    argu.Argument,
    argu.ProArgument,
    argu.ConArgument,
  ];

  static topology = [
    alertDialogTopology,
    containerTopology,
  ];

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
          <Property label={[schema.text, schema.description, dbo.abstract]} />
        </CardContent>
        <ActionsBar>
          <Property label={ontola.favoriteAction} />
        </ActionsBar>
        <CardAppendix>
          <Property label={argu.voteableVoteEvent} />
          <Property label={argu.topComment} />
          <Property clickToOpen forceRender label={app.omniform} />
        </CardAppendix>
      </Card>
    );
  }
}

export default register(ArgumentContainer);
