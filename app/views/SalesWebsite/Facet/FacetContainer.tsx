import {
  Collapse,
  GridDirection,
  Typography,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ChevronRight from '@material-ui/icons/ChevronRight';
import { makeStyles } from '@material-ui/styles';
import { SomeTerm } from '@ontologies/core';
import * as as from '@ontologies/as';
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
import { containerTopology } from '../../../topologies/Container';
import { SalesTheme } from '../../../themes/salesWebsite/SalesThemeProvider';

const useStyles = makeStyles<SalesTheme, Record<string, string>>(() => ({
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
    textAlign: 'left',
  },
  buttonTextSelected: {
    color: '#000',
    fontWeight: 'bold',
    lineHeight: 1.2,
    textAlign: 'left',
  },
  circleBase: {
    backgroundColor: (props) => props.color,
    borderRadius: '50%',
    content: '" "',
    opacity: '20%',
    position: 'absolute',
    transition: 'background-color 500ms',
    zIndex: 0,
  },
  containerRow: {
    flexDirection: 'row',
  },
  containerRowReverse: {
    flexDirection: 'row-reverse',
  },
  facetContainer: {
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
  },
  video: {
    border: 'solid',
    borderColor: '#E7E7E7',
    borderRadius: '15px',
    borderWidth: '8px',
    height: 'auto',
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
      <Typography className={classes.title} variant="h2">{name.value}</Typography>
      <Typography className={classes.subTitle} variant="subtitle1">{text.value}</Typography>
      <Grid
        container
        direction={flexDirection.value as GridDirection}
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
                {facet.subject !== currentFacet ?
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
                  :
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
                  </button>}
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
              <Resource autoPlay loop muted className={classes.video} subject={video} />
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
