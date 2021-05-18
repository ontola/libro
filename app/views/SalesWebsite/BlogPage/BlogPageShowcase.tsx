import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  FC,
  Resource,
  Type,
  useProperty,
} from 'link-redux';
import React from 'react';

import sales from '../../../ontology/sales';
import { showcaseTopology } from '../../../topologies/Showcase';
import { SalesTheme } from '../../../themes/salesWebsite/SalesThemeProvider';

const useStyles = makeStyles<SalesTheme>({
  icon: {
    color: '#2D7080',
    fontSize: 60,
  },
  image: {
    maxHeight: '15em',
    objectFit: 'cover',
    width: '100%',
  },
  mediaRoot: {
    position: 'relative',
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
  },
  root: {
    maxWidth: '28em',
  },
  text: {
    textAlign: 'left',
  },
  themeChip: {
    backgroundColor: 'white',
    borderRadius: '.4em',
    bottom: 0,
    fontWeight: 'bold',
    left: 0,
    padding: '.3em 1em',
    position: 'absolute',
  },
});

const BlogPageShowcase: FC = ({ subject }) => {
  const classes = useStyles();
  const [name] = useProperty(schema.name);
  const [image] = useProperty(schema.image) as SomeNode[];
  const [theme] = useProperty(sales.theme);
  const TypeWithClassName = Type as any;

  return (
    <Card className={classes.root}>
      <CardActionArea href={subject.value}>
        <CardMedia
          classes={{ root: classes.mediaRoot }}
          component="picture"
        >
          <Resource subject={image}>
            <TypeWithClassName className={classes.image} element={React.Fragment} />
            <Typography className={classes.themeChip} variant="body1">
              {theme.value}
            </Typography>
          </Resource>
        </CardMedia>
        <CardContent>
          <Typography className={classes.text} variant="h3">{name.value}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

BlogPageShowcase.type = sales.BlogPage;

BlogPageShowcase.topology = showcaseTopology;

export default BlogPageShowcase;
