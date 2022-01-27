import { makeStyles } from '@material-ui/styles';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import CardHeader from '../../components/Card/CardHeader';
import app from '../../ontology/app';
import argu from '../../ontology/argu';
import dbo from '../../ontology/dbo';
import ontola from '../../ontology/ontola';
import Card from '../../topologies/Card';
import CardAppendix from '../../topologies/Card/CardAppendix';
import { containerTopology } from '../../topologies/Container';
import { alertDialogTopology } from '../../topologies/Dialog';

export interface ArgumentConainerProps {
  highlighted: boolean;
}

const useStyles = makeStyles({
  content: {
    marginBottom: '1rem',
  },
});

const ArgumentContainer: FC<ArgumentConainerProps> = ({ highlighted, subject }): JSX.Element => {
  const classes = useStyles();

  return (
    <Card
      about={subject.value}
      shine={highlighted}
    >
      <Property label={ontola.coverPhoto} />
      <div className={classes.content}>
        <CardContent noSpacing>
          <CardHeader float={<Property label={argu.voteOptions} />}>
            <Property label={[schema.name, rdfs.label]} />
          </CardHeader>
          <Property label={[schema.text, schema.description, dbo.abstract]} />
        </CardContent>
      </div>
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
};

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
