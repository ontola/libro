import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button/Button';
import Grid from '@material-ui/core/Grid';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import { FC, useProperty } from 'link-redux';
import React from 'react';

import sales from '../../../ontology/sales';
import { showcaseTopology } from '../../../topologies/Showcase';
import { SalesTheme } from '../../../themes/salesWebsite/SalesThemeProvider';

const useStyles = makeStyles<SalesTheme>(() => ({
  button: {
    color: (props: Record<string, string>) => props.color,
    fontSize: 24,
    fontWeight: 'bold',
    margin: 30,
    textAlign: 'center',
    textTransform: 'none',
  },
  container: {
    backgroundColor: (props: Record<string, string>) => props.backgroundColor,
    borderBottomLeftRadius: 0,
    borderColor: 'grey',
    borderRadius: 5,
    borderTopLeftRadius: 0,
    color: (props: Record<string, string>) => props.color,
    marginTop: 50,
    padding: '0 30px',
  },
  icon: {
    color: (props: Record<string, string>) => props.color,
  },
  subTitle: {
    fontSize: 24,
    maxWidth: 575,
    textAlign: 'center',
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
}));

const Block: FC = () => {
  const [URL] = useProperty(schema.URL);
  const [name] = useProperty(schema.name);
  const [text] = useProperty(schema.text);
  const [color] = useProperty(schema.color);
  const [textColor] = useProperty(sales.textColor);
  const classes = useStyles({
    backgroundColor: color.value,
    color: textColor.value,
  });

  return (
    <Grid
      container
      alignItems="center"
      className={classes.container}
      direction="column"
      md={6}
    >
      <Typography
        className={classes.title}
        variant="h2"
      >
        {name.value}
      </Typography>
      <Typography
        className={classes.subTitle}
        variant="body2"
      >
        {text.value}
      </Typography>
      <Button
        className={classes.button}
        endIcon={(
          <ArrowRightAltIcon
            className={classes.icon}
            style={{ fontSize: 40 }}
          />
        )}
      >
        {URL.value}
      </Button>
    </Grid>
  );
};

Block.type = sales.Block;

Block.topology = showcaseTopology;

export default Block;
