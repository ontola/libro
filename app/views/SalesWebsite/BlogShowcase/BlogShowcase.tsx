import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button/Button';
import Grid from '@material-ui/core/Grid';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import { FC, useProperty } from 'link-redux';
import React from 'react';

import Image from '../../../components/Image';
import argu from '../../../ontology/argu';
import { showcaseTopology } from '../../../topologies/Showcase';
import { SalesTheme } from '../SalesThemeProvider';

const useStyles = makeStyles<SalesTheme>({
  iconStyle: {
    color: '#2D7080',
    fontSize: 60,
  },
  imageStyle: {
    maxWidth: '100%',
  },
  productButton: {
    backgroundColor: '#FFFFFF',
    borderColor: 'grey',
    borderRadius: 5,
    flex: 'column',
    margin: 10,
    marginTop: 50,
    padding: '0 30px',
    textTransform: 'none',
    width: '30%',
  },
  textStyle: {
    textAlign: 'left',
  },
});

const BlogShowcase: FC = () => {
  const classes = useStyles();
  const [image] = useProperty(schema.image);
  const [name] = useProperty(schema.name);
  const [theme] = useProperty(argu.ns('theme'));

  return (
    <Button
      className={classes.productButton}
    >
      <Grid
        container
        alignItems="center"
        direction="column"
      >
        <Image
          className={classes.imageStyle}
          linkedProp={image}
        />
        <Typography className={classes.textStyle} variant="h4">{name.value}</Typography>
        <Typography className={classes.textStyle}>{theme.value}</Typography>
        <ArrowRightAltIcon className={classes.iconStyle} />
      </Grid>
    </Button>
  );
};

BlogShowcase.type = argu.ns('BlogPage');

BlogShowcase.topology = showcaseTopology;

export default BlogShowcase;
