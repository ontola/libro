import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  useProperty,
} from 'link-redux';
import React from 'react';
import { NavLink } from 'react-router-dom';

import retrievePath from '../../../helpers/iris';
import sales from '../../../ontology/sales';
import { LibroTheme } from '../../../themes/themes';
import { fullResourceTopology } from '../../../topologies';
import Container from '../../../topologies/Container';

const useStyles = makeStyles<LibroTheme>((theme) => ({
  callToPricing: {
    [theme.breakpoints.down('md')]: {
      marginTop: '5em',
    },
    paddingBottom: '7em',
    textAlign: 'center',
  },
  facetsWrapper: {
    // COMMENT TD: Hier kan je die verschillende achtergrond kleuren gaan meegeven voor facet container achtergrond.
    backgroundColor: 'transparent',
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'underline',
  },
  wrapper: {
    // This should be removed if Page no longer sets a margin
    backgroundColor: theme.palette.background.default,
  },
}));

const FacetPageFull: FC = () => {
  const [color] = useProperty(schema.color);

  const classes = useStyles({
    backgroundColor: color.value,
  });
  const [moreTitle] = useProperty(sales.moreTitle);
  const [moreDescription] = useProperty(sales.moreDescription);
  const [morePageName] = useProperty(sales.morePageName);
  const [morePageLink] = useProperty(sales.morePageLink);

  return (
    <main
      className={classes.wrapper}
      role="main"
    >
      <Property label={sales.header} />
      <div className={classes.facetsWrapper}>
        <Container>
          <Property label={sales.facets} />
        </Container>
      </div>
      <Container className={classes.callToPricing}>
        <Typography variant="h2">
          {moreTitle.value}
        </Typography>
        <Typography>
          {moreDescription.value}
          <NavLink
            className={classes.link}
            id="facet-page-full-price-link"
            to={retrievePath(morePageLink.value)!}
          >
            {morePageName.value}
          </NavLink>
        </Typography>
      </Container>
      <Property
        label={sales.callToActionBlock}
        trackingId="facet-page-full-cta"
      />
    </main>
  );
};

FacetPageFull.type = sales.FacetPage;

FacetPageFull.topology = fullResourceTopology;

export default FacetPageFull;
