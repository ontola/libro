import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  List,
  ListItem,
  Typography,
} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import * as rdfs from '@ontologies/rdfs';
import clsx from 'clsx';
import { SomeNode } from 'link-lib';
import {
  FC,
  register,
  useProperty,
  useResourceProperty,
} from 'link-redux';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import sales from '../../../ontology/sales';
import { SalesTheme } from '../../../themes/salesWebsite/SalesThemeProvider';
import { gridTopology } from '../../../topologies/Grid';

const OUTLINE_SPACING = 2.7;

const useStyles = makeStyles<SalesTheme>((theme) => ({
  actions: {
    alignSelf: 'center',
    padding: '2em',
  },
  bestOffer: {
    ['&:before']: {
      backgroundColor: '#2D7080',
      borderTopLeftRadius: theme.spacing(1),
      borderTopRightRadius: theme.spacing(1),
      color: 'white',
      content: '"Meest gekozen"',
      fontSize: '1.8em',
      left: theme.spacing(OUTLINE_SPACING),
      padding: '.1em',
      position: 'absolute',
      right: theme.spacing(OUTLINE_SPACING),
      textAlign: 'center',
      top: '-.5em',
    },
    outline: '2px solid #2D7080',
  },
  cardRoot: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '20em',
    minHeight: '45em',
  },
  checkMark: {
    color: '#2D7080',
    marginRight: '.5em',
  },
  contentWrapper: {
    flexGrow: 1,
  },
  ctaLabel: {
    fontSize: '1.3em',
  },
  ctaRoot: {
    textTransform: 'none',
  },
  infoHeader: {
    minHeight: '21em',
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
}));

const TierGrid: FC = () => {
  const classes = useStyles();
  const [name] = useProperty(schema.name);
  const [text] = useProperty(schema.text);
  const [priceInterval] = useProperty(sales.ns('priceInterval'));
  const [priceUnit] = useProperty(sales.ns('priceUnit'));
  const [includesList] = useProperty(sales.ns('includes')) as SomeNode[];
  const includes = useResourceProperty(includesList, rdfs.member);
  const [bestOffer] = useProperty(sales.ns('bestOffer'));

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
    <Grid item className={classes.root}>
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
            {includes.map((include) => (
              <ListItem key={include.value}>
                <CheckCircleIcon className={classes.checkMark} />
                {include.value}
              </ListItem>
            ))}
          </List>
        </CardContent>
        <CardActions className={classes.actions}>
          <Button
            classes={{
              label: classes.ctaLabel,
              root: classes.ctaRoot,
            }}
            color="secondary"
            endIcon={<ChevronRightIcon />}
            variant="contained"
          >
            <FormattedMessage
              defaultMessage="Neem contact op"
              id="https://app.argu.co/i18n/sales/contactUs"
            />
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

TierGrid.type = sales.ns('Tier');

TierGrid.topology = gridTopology;

export default register(TierGrid);
