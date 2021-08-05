import { Collapse, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import ChevronRight from '@material-ui/icons/ChevronRight';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { makeStyles } from '@material-ui/styles';
import * as as from '@ontologies/as';
import { SomeTerm } from '@ontologies/core';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import clsx from 'clsx';
import { SomeNode } from 'link-lib';
import {
  FC,
  Resource,
  useProperty,
  useResourceLinks,
  useResourceProperty,
} from 'link-redux';
import React from 'react';

import sales from '../../../ontology/sales';
import { SalesTheme } from '../../../themes/salesWebsite/SalesThemeProvider';
import { containerTopology } from '../../../topologies/Container';

const SMALL_SCREEN_TITLE_MARGIN = 15;

const useStyles = makeStyles<SalesTheme, Record<string, string>>((theme) => ({
  bigCircle: {
    height: 300,
    marginLeft: -110,
    marginTop: 133,
    width: 300,
  },
  button: {
    alignItems: 'center',
    color: '#000',
    display: 'flex',
    flexDirection: 'row',
    fontFamily: 'Open Sans',
  },
  buttonG: {
    color: 'red',
  },
  buttonText: {
    '&:hover': {
      color: '#000',
      cursor: 'pointer',
    },
    color: '#707070',
    fontWeight: 'bold',
    lineHeight: 1.2,
    marginBottom: 0,
    textAlign: 'left',
  },
  buttonTextSelected: {
    color: '#000',
    fontWeight: 'bold',
    lineHeight: 1.2,
    marginBottom: 0,
    textAlign: 'left',
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
  collapseText: {
    marginLeft: '2rem',
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
  facetContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    fontFamily: 'Open Sans',
    fontSize: 20,
    lineHeight: 1.2,
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
  const [color, setColor] = React.useState('#000');

  const [flexDirection] = useProperty(sales.flexDirection);
  const [name] = useProperty(schema.name);
  const [text] = useProperty(schema.text);
  const [items] = useProperty(as.items) as [SomeNode];

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

  const members = useResourceProperty(items, rdfs.member) ;
  const facets = useResourceLinks(members as SomeNode[], facetProps);

  const [currentFacet, setCurrentFacet] = React.useState(members[0]);
  const [video, setVideo] = React.useState<SomeTerm>();

  React.useEffect(() => {
    const facet = facets.find((f) => f.subject === currentFacet);
    setVideo(facet?.image);
    setColor(facet?.color?.value ?? '#000');
  }, [currentFacet]);

  return (
    <Grid
      container
      className={classes.wrapper}
      direction="column"
    >
      <Typography className={classes.title} variant="h2">
        {name.value}
      </Typography>
      <Typography className={classes.subTitle} variant="subtitle1">
        {text.value}
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
            <div key={facet.subject!.value}>
              <div className={classes.facetContainer}>
                {facet.subject !== currentFacet ? (
                  <button
                    className={classes.button}
                    key={facet.subject!.value}
                    type="button"
                    onClick={() => setCurrentFacet(facet.subject!)}
                  >
                    <ChevronRight
                      style={{
                        color: '#B33A00',
                        fontSize: 30,
                      }}
                    />
                    <Typography className={classes.buttonText} onClick={() => setCurrentFacet(facet.subject!)}>
                      {facet.name!.value}
                    </Typography>
                  </button>
                )
                  : (
                    <button
                      className={classes.button}
                      key={facet.subject!.value}
                      type="button"
                      onClick={() => setCurrentFacet(facet.subject!)}
                    >
                      <KeyboardArrowDownIcon
                        style={{
                          color: '#B33A00',
                          fontSize: 30,
                        }}
                      />
                      <Typography className={classes.buttonTextSelected} onClick={() => setCurrentFacet(facet.subject!)}>
                        {facet.name!.value}
                      </Typography>
                    </button>
                  )}
              </div>
              <Collapse in={facet.subject === currentFacet}>
                <Typography className={classes.collapseText} variant="body1">
                  {facet.text!.value}
                </Typography>
              </Collapse>
            </div>
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
