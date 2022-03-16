import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import * as as from '@ontologies/as';
import { SomeTerm } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import clsx from 'clsx';
import {
  FC,
  Resource,
  array,
  useIds,
  useProperty,
  useResourceLinks,
  useValues,
} from 'link-redux';
import React from 'react';

import { Facet, FacetType } from '../../../components/SalesWebsite/Facet';
import sales from '../../../ontology/sales';
import { LibroTheme } from '../../../themes/themes';
import { containerTopology } from '../../../topologies/Container';

const SMALL_SCREEN_TITLE_MARGIN = 15;

const useStyles = makeStyles<LibroTheme, Record<string, string>>((theme) => ({
  bigCircle: {
    height: 300,
    marginLeft: -110,
    marginTop: 133,
    width: 300,
  },
  buttonG: {
    color: 'red',
  },
  circleBase: {
    backgroundColor: (props) => props.color,
    borderRadius: '50%',
    content: '" "',
    opacity: '20%',
    pointerEvents: 'none',
    position: 'absolute',
    transition: 'background-color 500ms',
    zIndex: 0,
  },
  containerRow: {
    flexDirection: 'row',
  },
  containerRowReverse: {
    flexDirection: 'row-reverse',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row',
    },
  },
  leftPaneContainer: {
    padding: 20,
  },
  smallCircle: {
    [theme.breakpoints.down('sm')]: {
      marginLeft: 10,
    },
    height: 180,
    marginLeft: 485,
    marginTop: -50,
    width: 180,
  },
  subTitle: {
    color: '#2D7080',
    fontSize: 37,
    fontWeight: 'bold',
    lineHeight: 1.4,
    margin: 0,
    marginBottom: 28,
    maxWidth: 650,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 0,
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(SMALL_SCREEN_TITLE_MARGIN),
    },
  },
  video: {
    '@supports not (backdrop-filter: blur(10px))': {
      backgroundColor: 'rgb(231, 231, 231)',
    },
    aspectRatio: '16 / 10',
    backdropFilter: 'blur(10px)',
    backgroundColor: 'rgb(231, 231, 231, 57%)',
    borderRadius: '15px',
    borderWidth: '8px',
    boxShadow: '0px 3px 12px 0px rgb(0 0 0 / 22%)',
    height: 'auto',
    objectFit: 'contain',
    padding: '10px',
    position: 'relative',
    width: '100%',
    zIndex: 2,
  },
  wrapper: {
    minHeight: 660,
  },
}));

const facetProps = {
  color: schema.color,
  image: schema.image,
  name: schema.name,
  text: schema.text,
};

const FacetContainer: FC = () => {
  const [flexDirection] = useProperty(sales.flexDirection);
  const [name] = useValues(schema.name);
  const [text] = useValues(schema.text);
  const members = useIds(array(as.items));
  const facets = useResourceLinks(members, facetProps);

  const [color, setColor] = React.useState('#000');
  const [currentFacet, setCurrentFacet] = React.useState<FacetType>(facets[0]);
  const [video, setVideo] = React.useState<SomeTerm>();

  const classes = useStyles({
    color: color,
  });

  const containerClass = clsx({
    [classes.circleBase]: true,
    [classes.bigCircle]: flexDirection.value === 'row',
    [classes.smallCircle]: flexDirection.value === 'row-reverse',
  });

  const textContainerClass = clsx({
    [classes.containerRow]: flexDirection.value === 'row',
    [classes.containerRowReverse]: flexDirection.value === 'row-reverse',
  });

  React.useEffect(() => {
    if (currentFacet) {
      setVideo(currentFacet.image);
      setColor(currentFacet.color?.value ?? '#000');
    }
  }, [currentFacet]);

  return (
    <Grid
      container
      className={classes.wrapper}
      direction="column"
    >
      <Typography
        className={classes.title}
        variant="h2"
      >
        {name}
      </Typography>
      <Typography
        className={classes.subTitle}
        component="p"
        variant="subtitle1"
      >
        {text}
      </Typography>
      <Grid
        container
        className={textContainerClass}
      >
        <Grid
          item
          className={classes.leftPaneContainer}
          direction="column"
          md={6}
        >
          {facets.map((facet) => (
            <Facet
              current={facet.subject === currentFacet.subject}
              facet={facet}
              key={facet.subject?.value}
              onClick={setCurrentFacet}
            />
          ))}
        </Grid>
        <Grid
          item
          alignItems="center"
          className={classes.rightPaneContainer}
          direction="column"
          md={6}
        >
          <div>
            <div className={containerClass} />
            {video && (
              <Resource
                autoPlay
                loop
                muted
                playsInline
                className={classes.video}
                subject={video}
                width="100%"
              />
            )}
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

FacetContainer.type = sales.Facet;

FacetContainer.topology = containerTopology;

export default FacetContainer;
