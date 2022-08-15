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

import dbo from '../../../Common/ontology/dbo';
import CardContent from '../../../Common/components/Card/CardContent';
import CardHeader from '../../../Common/components/Card/CardHeader';
import HeadingContext from '../../../Common/components/Heading/HeadingContext';
import LinkedDetailDate from '../../../Common/components/LinkedDetailDate';
import { alertDialogTopology, containerTopology } from '../../../Common/topologies';
import Card from '../../../Common/topologies/Card';
import CardAppendix from '../../../Common/topologies/Card/CardAppendix';
import DetailsBar from '../../../Common/topologies/DetailsBar';
import { useHighlight } from '../../../Common/components/HighlightProvider/HighlightProvider';
import app from '../../../Common/ontology/app';
import ontola from '../../../Kernel/ontology/ontola';
import argu from '../../ontology/argu';

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
    <Card shine={subject.value === highlightState}>
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
