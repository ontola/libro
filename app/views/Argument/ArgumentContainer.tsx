import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  Property,
  register,
} from 'link-redux';
import { SubjectProp } from 'link-redux/dist-types/types';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import app from '../../ontology/app';
import argu from '../../ontology/argu';
import dbo from '../../ontology/dbo';
import ontola from '../../ontology/ontola';
import ActionsBar from '../../topologies/ActionsBar';
import Card from '../../topologies/Card';
import CardAppendix from '../../topologies/Card/CardAppendix';
import { containerTopology } from '../../topologies/Container';
import { alertDialogTopology } from '../../topologies/Dialog';

interface ArgumentContainerProps extends SubjectProp {
  highlighted: boolean;
}

const ArgumentContainer = ({ highlighted, subject }: ArgumentContainerProps) => (
  <Card
    about={subject.value}
    shine={highlighted}
  >
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
      <Property
        clickToOpen
        forceRender
        label={app.omniform}
      />
    </CardAppendix>
  </Card>
);

ArgumentContainer.type = [
  argu.Argument,
  argu.ProArgument,
  argu.ConArgument,
];

ArgumentContainer.topology = [
  alertDialogTopology,
  containerTopology,
];

export default register(ArgumentContainer);
