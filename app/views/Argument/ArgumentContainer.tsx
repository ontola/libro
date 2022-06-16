import { makeStyles } from '@mui/styles';
import * as rdfx from '@ontologies/rdf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
  useTopology,
} from 'link-redux';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import CardHeader from '../../components/Card/CardHeader';
import HeadingContext from '../../components/Heading/HeadingContext';
import { useHighlight } from '../../components/HighlightProvider';
import LinkedDetailDate from '../../components/LinkedDetailDate';
import app from '../../ontology/app';
import argu from '../../ontology/argu';
import dbo from '../../ontology/dbo';
import ontola from '../../ontology/ontola';
import { alertDialogTopology, containerTopology } from '../../topologies';
import Card from '../../topologies/Card';
import CardAppendix from '../../topologies/Card/CardAppendix';
import DetailsBar from '../../topologies/DetailsBar';

const useStyles = makeStyles({
  content: {
    marginBottom: '1rem',
  },
});

const ArgumentContainer: FC = ({ subject }): JSX.Element => {
  const classes = useStyles();
  const topology = useTopology();
  const { highlightState } = useHighlight();

  return (
    <Card
      about={subject.value}
      shine={subject.value === highlightState}
    >
      <HeadingContext>
        <Property label={ontola.coverPhoto} />
        <div className={classes.content}>
          <DetailsBar>
            <Property label={schema.creator} />
            {topology === alertDialogTopology && <Property label={rdfx.type} />}
            <LinkedDetailDate />
          </DetailsBar>
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
      </HeadingContext>
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
