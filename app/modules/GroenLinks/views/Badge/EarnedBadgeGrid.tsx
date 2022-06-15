import { useMediaQuery, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import * as schema from '@ontologies/schema';
import {
  Property,
  register,
  useDataFetching,
  useFields,
  useIds,
  useProperty,
} from 'link-redux';
import React from 'react';

import teamGL from '../../ontology/teamGL';
import { BreakPoints } from '../../../../themes/themes';
import { gridTopology } from '../../../../topologies';
import Heading, { HeadingSize } from '../../../Common/components/Heading';
import Image from '../../../Common/components/Image';

const PENDING_BADGE_OPACITY = 0.2;

const useStyles = makeStyles(() => ({
  heading: {
    fontSize: '1em!important',
  },
  headingSmall: {
    fontSize: '.9em!important',
  },
}));

const EarnedBadgeGrid = () => {
  const [badge] = useIds(teamGL.badge);
  const [dateCreated] = useProperty(schema.dateCreated);

  useDataFetching([badge]);
  const [image] = useFields(badge, schema.image);
  const [name] = useFields(badge, schema.name);
  const theme = useTheme();
  const screenIsNarrow = useMediaQuery(theme.breakpoints.down(BreakPoints.Medium));
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
          className={screenIsNarrow ? classes.headingSmall : classes.heading}
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
