import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { NamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  Resource,
  Type,
  useIds,
  useProperty,
} from 'link-redux';
import React from 'react';
import { NavLink } from 'react-router-dom';

import retrievePath from '../../../helpers/iris';
import sales from '../../../ontology/sales';
import { LibroTheme } from '../../../themes/themes';
import { showcaseTopology } from '../../../topologies/Showcase';

export interface BlogPageShowcaseProps {
  headingLevel?: React.ElementType;
}

const THEME_CHIP_SPACING = 3;

const useStyles = makeStyles<LibroTheme>((theme) => ({
  card: {
    height: '100%',
    maxWidth: '30rem',
  },
  icon: {
    color: '#2D7080',
    fontSize: 60,
  },
  image: {
    height: '250px',
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
  },
  text: {
    textAlign: 'left',
  },
  themeChip: {
    backgroundColor: 'white',
    borderRadius: '.4em',
    bottom: 0,
    fontWeight: 'bold',
    left: theme.spacing(THEME_CHIP_SPACING),
    padding: '.3em 1em',
    position: 'absolute',
  },
}));

const BlogPageShowcase: FC<BlogPageShowcaseProps> = ({ subject, headingLevel }) => {
  const classes = useStyles();
  const [name] = useProperty(schema.name);
  const [image] = useIds(schema.image);
  const [theme] = useProperty(sales.theme);
  const TypeWithClassName = Type as any;

  return (
    <Card
      className={classes.card}
      variant="outlined"
    >
      <CardActionArea
        component={NavLink as React.ElementType}
        to={retrievePath(subject as NamedNode)!}
      >
        <CardMedia
          classes={{ root: classes.mediaRoot }}
          component="picture"
        >
          <Resource subject={image}>
            <TypeWithClassName
              className={classes.image}
              element={React.Fragment}
            />
            <Typography
              className={classes.themeChip}
              variant="body1"
            >
              {theme.value}
            </Typography>
          </Resource>
        </CardMedia>
        <CardContent>
          <Typography
            className={classes.text}
            component={headingLevel ?? 'h3'}
            variant="h3"
          >
            {name.value}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

BlogPageShowcase.type = sales.BlogPage;

BlogPageShowcase.topology = showcaseTopology;

export default BlogPageShowcase;
