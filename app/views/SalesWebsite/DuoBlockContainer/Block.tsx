import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button/Button';
import Grid from '@material-ui/core/Grid';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import { FC, useProperty } from 'link-redux';
import React from 'react';

import argu from '../../../ontology/argu';
import { showcaseTopology } from '../../../topologies/Showcase';
import { SalesTheme } from '../SalesThemeProvider';

const useStyles = makeStyles<SalesTheme>((theme) => ({
  buttonMain: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    margin: 30,
    textAlign: 'center',
    textTransform: 'none',
  },
  buttonSecondary: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 30,
    textAlign: 'center',
    textTransform: 'none',
  },
  container: {
    backgroundColor: 'orange',
    width: '50%',
  },
  headerMain: {
    fontWeight: 'bold',
  },
  headerSecondary: {
    fontWeight: 'bold',
  },
  iconMain: {
    color: 'white',
  },
  iconSecondary: {
    color: theme.palette.primary.main,
  },
  subTitleMain: {
    fontSize: 24,
    maxWidth: 335,
    textAlign: 'center',
  },
  subTitleSecondary: {
    fontSize: 24,
    maxWidth: 563,
    textAlign: 'center',
  },
  viewMain: {
    backgroundColor: '#2D7080',
    borderColor: 'grey',
    borderRadius: 5,
    color: 'white',
    marginTop: 50,
    padding: '0 30px',
    width: '50%',
  },
  viewSecondary: {
    borderColor: 'grey',
    borderRadius: 5,
    color: 'black',
    marginTop: 50,
    padding: '0 30px',
    width: '50%',
  },
}));

const Block: FC = () => {
  const classes = useStyles();
  const [URL] = useProperty(schema.URL);
  const [name] = useProperty(schema.name);
  const [text] = useProperty(schema.text);
  const [toggle] = useProperty(argu.ns('toggle'));
  const backgroundColor = toggle?.value === 'false' ? classes.viewMain : classes.viewSecondary;
  const headerStyle = toggle?.value === 'false' ? classes.headerMain : classes.headerSecondary;
  const subTitleStyle = toggle?.value === 'false' ? classes.subTitleMain : classes.subTitleSecondary;
  const iconStyle = toggle?.value === 'false' ? classes.iconMain : classes.iconSecondary;
  const buttonStyle = toggle?.value === 'false' ? classes.buttonMain : classes.buttonSecondary;

  return (
    <Grid
      container
      alignItems="center"
      className={backgroundColor}
      direction="column"
    >
      <Typography className={headerStyle} variant="h2">{name.value}</Typography>
      <Typography className={subTitleStyle} variant="body2">{text.value}</Typography>
      <Button
        className={buttonStyle}
        endIcon={<ArrowRightAltIcon className={iconStyle} style={{ fontSize: 40 }} />}
      >
        {URL.value}
      </Button>
    </Grid>
  );
};

Block.type = argu.ns('Block');

Block.topology = showcaseTopology;

export default Block;
