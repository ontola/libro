import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button/Button';
import Grid from '@material-ui/core/Grid';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  useProperty,
} from 'link-redux';
import React from 'react';

import Image from '../../../components/Image';
import argu from '../../../ontology/argu';
import { containerTopology } from '../../../topologies/Container';
import Showcase from '../../../topologies/Showcase';
import { SalesTheme } from '../SalesThemeProvider';

const useStyles = makeStyles<SalesTheme>((theme) => ({
  button: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 30,
    textTransform: 'none',
  },
  container: {
    margin: 'auto',
    width: '100%',
  },
  iconStyle: {
    color: '#2D7080',
    fontSize: 60,
  },
  image: {
    backgroundSize: 'percentage',
    // marginBottom: '1em',
    // position: 'absolute',
    maxWidth: '100%',
  },
  propositionSelector: {
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: '1fr 1fr 1fr',
    },
    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '1fr',
    },
    // borderRadius: 5,
    // boxShadow: '0 0 25px rgba(0,0,0,0.2)',
    display: 'grid',
    // flex: 1,
    gridTemplateColumns: '1fr 1fr 1fr',
    // marginTop: 50,
    // padding: '0 30px',
    // textAlign: 'left',
    // textTransform: 'none',
  },
  subTitle: {
    margin: 'auto',
    marginBottom: '3rem',
    maxWidth: 519,
    textAlign: 'center',
  },
}));

const CaseContainer: FC = () => {
  const classes = useStyles();
  const [image] = useProperty(schema.image);
  const [name] = useProperty(schema.name);
  const [text] = useProperty(schema.text);
  const [caseButtonText] = useProperty(argu.ns('caseButtonText'));

  return (
    <Grid
      container
      alignItems="center"
      className={classes.container}
      direction="column"
      justify="center"
    >
      <Typography variant="h2">{name.value}</Typography>
      <Typography className={classes.subTitle}>{text.value}</Typography>
      <Image
        className={classes.image}
        linkedProp={image}
      />
      <Showcase>
        <div className={classes.propositionSelector}>
          <Property label={argu.ns('caseShowcase')} />
        </div>
      </Showcase>
      <Button
        className={classes.button}
        endIcon={<ArrowRightAltIcon color="primary" style={{ fontSize: 35 }} />}
      >
        {caseButtonText.value}
      </Button>
    </Grid>
  );
};

CaseContainer.type = argu.ns('Cases');

CaseContainer.topology = containerTopology;

export default CaseContainer;
