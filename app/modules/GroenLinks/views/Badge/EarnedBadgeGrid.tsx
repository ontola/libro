import { useMediaQuery, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  Property,
  register,
  useDataFetching,
  useProperty,
  useResourceProperty,
} from 'link-redux';
import React from 'react';

import Heading, { HeadingSize } from '../../../../components/Heading';
import Image from '../../../../components/Image';
import teamGL from '../../../../ontology/teamGL';
import { gridTopology } from '../../../../topologies/Grid';

const PENDING_BADGE_OPACITY = 0.2;

const useStyles = makeStyles(() => ({
  header: {
    fontSize: '1em!important',
  },
  headerSmall: {
    fontSize: '.9em!important',
  },
}));

const EarnedBadgeGrid = () => {
  const [badge] = useProperty(teamGL.badge) as SomeNode[];
  const [dateCreated] = useProperty(schema.dateCreated);

  useDataFetching([badge]);
  const [image] = useResourceProperty(badge, schema.image);
  const [name] = useResourceProperty(badge, schema.name);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();

  return (
    <div
      style={{
        opacity: dateCreated ? 1 : PENDING_BADGE_OPACITY,
        textAlign: 'center',
      }}
    >
      <Property label={teamGL.badge}>
        <Heading
          className={matches ? classes.headerSmall : classes.header}
          size={HeadingSize.LG}
        >
          {name?.value}
        </Heading>
        <Image
          linkedProp={image}
          style={{
            height: 'auto',
            marginBottom: '1em',
            maxWidth: '100%',
            width: '180px',
          }}
        />
        <Property label={schema.description} />
      </Property>
    </div>
  );
};

EarnedBadgeGrid.type = teamGL.EarnedBadge;

EarnedBadgeGrid.topology = [
  gridTopology,
];

export default register(EarnedBadgeGrid);
