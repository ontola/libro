import {
  Collapse,
  GridDirection,
  Typography,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ChevronRight from '@material-ui/icons/ChevronRight';
import { makeStyles } from '@material-ui/styles';
import * as as from '@ontologies/as';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import clsx from 'clsx';
import { SomeNode } from 'link-lib';
import {
  FC,
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
    backgroundColor: (props) => props.color,
    borderRadius: '50%',
    content: '" "',
    height: 300,
    marginLeft: -110,
    marginTop: 133,
    opacity: '20%',
    position: 'absolute',
    width: 300,
    zIndex: 0,
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
  },
  buttonTextSelected: {
    color: '#000',
    fontWeight: 'bold',
    lineHeight: 1.2,
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
    backgroundColor: (props) => props.color,
    borderRadius: '50%',
    content: '" "',
    height: 180,
    marginLeft: 485,
    marginTop: -50,
    opacity: '20%',
    position: 'absolute',
    width: 180,
    zIndex: 0,
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
  const [color] = useProperty(schema.color);
  const [flexDirection] = useProperty(sales.flexDirection);
  const [name] = useProperty(schema.name);
  const [text] = useProperty(schema.text);
  const [items] = useProperty(as.items);
  const classes = useStyles({
    color: color.value,
  });

  const containerClass = clsx({
    [classes.bigCircle]: flexDirection.value === 'row',
    [classes.smallCircle]: flexDirection.value === 'row-reverse',
  });

  const members = useResourceProperty(items as SomeNode, rdfs.member);
  const [currentFacet, setCurrentFacet] = React.useState(members[0]);
  const facets = useResourceLinks(members as SomeNode[], facetProps);
  const video = facets
    .find((facet) => facet.subject === currentFacet)
    ?.image;

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
            <video autoPlay loop muted className={classes.video}>
              <source
                src={video!.value}
              />
            </video>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

FacetContainer.type = sales.Facet;

FacetContainer.topology = containerTopology;

export default FacetContainer;
