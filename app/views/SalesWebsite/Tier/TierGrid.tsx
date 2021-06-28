import {
  Card,
  CardActions,
  CardContent,
  Grid,
  List,
  ListItem,
  Typography,
} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { makeStyles } from '@material-ui/styles';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import clsx from 'clsx';
import { SomeNode } from 'link-lib';
import {
  FC,
  Resource,
  register,
  useProperty,
  useResourceProperty,
} from 'link-redux';
import React from 'react';
import { useIntl } from 'react-intl';

import { CallToActionButton } from '../../../components/SalesWebsite';
import sales from '../../../ontology/sales';
import { SalesTheme } from '../../../themes/salesWebsite/SalesThemeProvider';
import { gridTopology } from '../../../topologies/Grid';
import { salesMessages } from '../../../translations/messages';

const BEST_OFFER_WIDTH = '80%';

const useStyles = makeStyles<SalesTheme>((theme) => ({
  actions: {
    alignSelf: 'center',
    padding: '2em',
  },
  bestOffer: {
    ['&:before']: {
      backgroundColor: '#2D7080',
      borderRadius: theme.shape.borderRadius,
      color: 'white',
      content: '"Meest gekozen"',
      fontSize: '1em',
      left: `calc((100% - ${BEST_OFFER_WIDTH}) / 2)`,
      padding: '.4em',
      position: 'absolute',
      textAlign: 'center',
      top: '-2.5em',
      width: BEST_OFFER_WIDTH,
    },
    border: '2px solid #2D7080',
  },
  bestOfferWrapper: {
    [theme.breakpoints.up('md')]: {
      marginTop: 'unset',
    },
    marginTop: '50px',
  },
  cardRoot: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '20em',
    [theme.breakpoints.up('md')]: {
      minHeight: '45em',
    },
  },
  checkMark: {
    color: '#2D7080',
    marginRight: '.5em',
  },
  contentWrapper: {
    flexGrow: 1,
  },
  infoHeader: {
    [theme.breakpoints.up('md')]: {
      minHeight: '15em',
    },
  },
  label: {
    fontWeight: theme.typography.fontWeightBold,
  },
  priceInterval: {
    display: 'inline',
    fontSize: theme.typography.fontSize,
    verticalAlign: 'super',
  },
  priceUnit: {
    display: 'inline',
    fontSize: '2.5em',
    fontWeight: theme.typography.fontWeightMedium,
  },
  root: {
    position: 'relative',
  },
  tagline: {
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

const TierGrid: FC = () => {
  const classes = useStyles();
  const intl = useIntl();
  const [name] = useProperty(schema.name);
  const [text] = useProperty(schema.text);
  const [priceInterval] = useProperty(sales.priceInterval);
  const [priceUnit] = useProperty(sales.priceUnit);
  const [includesList] = useProperty(sales.includes) as SomeNode[];
  const [buttonLink] = useProperty(sales.buttonLink);
  const includes = useResourceProperty(includesList, rdfs.member);
  const [bestOffer] = useProperty(sales.bestOffer);
  const [tagline] = useProperty(sales.tagline);

  const pricing = (
    <React.Fragment>
      <Typography className={classes.priceUnit} variant="h5">
        {priceUnit.value}
      </Typography>
      {priceInterval && (
        <Typography className={classes.priceInterval}>
          {'/ '}
          {priceInterval.value}
        </Typography>
      )}
    </React.Fragment>
  );

  return (
    <Grid
      item
      className={clsx({
        [classes.root]: true,
        [classes.bestOfferWrapper]: bestOffer,
      })}
    >
      <Card
        className={clsx({
          [classes.cardRoot]: true,
          [classes.bestOffer]: bestOffer,
        })}
      >
        <CardContent className={classes.contentWrapper}>
          <div className={classes.infoHeader}>
            <Typography className={classes.label} variant="h5">{name.value}</Typography>
            {pricing}
            <Typography variant="body1">{text.value}</Typography>
          </div>
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
        </CardContent>
        <CardActions className={classes.actions}>
          <CallToActionButton
            text={intl.formatMessage(salesMessages.contactUs)}
            url={buttonLink.value}
          />
        </CardActions>
      </Card>
    </Grid>
  );
};

TierGrid.type = sales.Tier;

TierGrid.topology = gridTopology;

export default register(TierGrid);
