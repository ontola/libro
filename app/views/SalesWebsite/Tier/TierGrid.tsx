import {
  Grid,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { makeStyles } from '@mui/styles';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  Resource,
  array,
  register,
  useFields,
  useIds,
  useProperty,
  useStrings,
} from 'link-redux';
import React from 'react';
import { useIntl } from 'react-intl';

import { CallToActionButton } from '../../../components/SalesWebsite';
import sales from '../../../ontology/sales';
import {
  BreakPoints,
  LibroTheme,
  Margin,
} from '../../../themes/themes';
import { gridTopology } from '../../../topologies';
import { salesMessages } from '../../../translations/messages';

import { PricingInterval } from './Price';

interface StyleProps {
  color: string,
}

export interface TierGridProps {
  interval: PricingInterval,
}

const useStyles = makeStyles<LibroTheme, StyleProps>((theme) => ({
  actions: {
    alignSelf: 'center',
    padding: '2em',
  },
  cardRoot: {
    border: '2px solid #d1d1d1',
    borderBottomLeftRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius,
    borderTop: 'none',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(Margin.Medium),
    [theme.breakpoints.up(BreakPoints.Medium)]: {
      minHeight: '40rem',
    },
  },
  checkMark: {
    color: ({ color }) => color,
    marginRight: '.5em',
  },
  colorBar: {
    backgroundColor: ({ color }) => color,
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
  },
  contentWrapper: {
    flexGrow: 1,
  },
  description: {
    marginTop: theme.spacing(Margin.Medium),
  },
  infoHeader: {
    [theme.breakpoints.up(BreakPoints.Medium)]: {
      minHeight: '12rem',
    },
  },
  label: {
    fontWeight: theme.typography.fontWeightBold,
  },
  root: {
    display: 'grid',
    gridTemplateRows: '2rem 1fr',
    position: 'relative',
    scrollSnapAlign: 'center',
  },
  tagline: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  tierBullets: {
    flexGrow: 1,
  },
}));

const TierGrid: FC<TierGridProps> = ({ interval }) => {
  const [color] = useStrings(schema.color);
  const classes = useStyles({ color });

  const intl = useIntl();
  const [name] = useProperty(schema.name);
  const [text] = useIds(schema.text);
  const includes = useFields(array(sales.includes));
  const [buttonLink] = useProperty(sales.buttonLink);
  const [tagline] = useProperty(sales.tagline);

  return (
    <Grid
      item
      className={classes.root}
    >
      <div className={classes.colorBar} />
      <div className={classes.cardRoot}>
        <div className={classes.infoHeader}>
          <Typography
            className={classes.label}
            component="h2"
            variant="h5"
          >
            {name.value}
          </Typography>
          <Property
            interval={interval}
            label={schema.price}
          />
          <Typography
            className={classes.description}
            variant="body1"
          >
            <Resource subject={text} />
          </Typography>
        </div>
        <div className={classes.tierBullets}>
          <List>
            <ListItem className={classes.tagline}>
              {tagline && tagline.value}
            </ListItem>
            {includes.map((include) => (
              <ListItem key={include.value}>
                <CheckCircleIcon className={classes.checkMark} />
                {include.termType === 'Literal' ? include.value : <Resource subject={include} />}
              </ListItem>
            ))}
          </List>
        </div>
        <CallToActionButton
          text={intl.formatMessage(salesMessages.contactUs)}
          url={buttonLink.value}
        />
      </div>
    </Grid>
  );
};

TierGrid.type = sales.Tier;

TierGrid.topology = gridTopology;

export default register(TierGrid);
