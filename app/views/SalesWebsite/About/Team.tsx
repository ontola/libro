import { Node } from '@ontologies/core';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import {
  FC,
  Resource,
  register,
  useProperty,
  useResourceProperty,
} from 'link-redux';
import React from 'react';

import sales from '../../../ontology/sales';
import { allTopologies } from '../../../topologies';
import Showcase from '../../../topologies/Showcase';
import { SalesTheme } from '../../../themes/salesWebsite/SalesThemeProvider';

const CONTAINER_PADDING = 10;
const GRID_GAP = 20;

const useStyles = makeStyles<SalesTheme>((theme) => ({
  container: {
    backgroundColor: '#F8FBFF',
    padding: theme.spacing(CONTAINER_PADDING),
  },
  showcase: {
    display: 'grid',
    gap: theme.spacing(GRID_GAP),
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    marginBottom: theme.spacing(CONTAINER_PADDING),
    marginTop: '5.3rem',
  },
}));

const Team: FC = () => {
  const classes = useStyles();
  const [heading] = useProperty(schema.name);
  const [teamMembers] = useProperty(sales.teamMembers);
  const teamMembersMembers = useResourceProperty(teamMembers as Node, rdfs.member);

  return (
    <div className={classes.container}>
      <Typography
        align="center"
        variant="h2"
      >
        {heading.value}
      </Typography>
      <Showcase className={classes.showcase}>
        {teamMembersMembers.map((member) => (
          <Resource
            key={member.value}
            subject={member}
          />
        ))}
      </Showcase>
    </div>
  );
};

Team.type = sales.Team;
Team.topology = allTopologies;

export default register(Team);
