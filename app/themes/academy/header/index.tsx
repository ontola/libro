import { makeStyles } from '@mui/styles';
import { Property, Resource } from 'link-redux';
import React from 'react';
import { NavLink } from 'react-router-dom';

import retrievePath from '../../../modules/Common/lib/iris';
import { useWebsiteIRI } from '../../../modules/Core/hooks/useWebsiteIRI';
import ontola from '../../../ontology/ontola';
import Navbar from '../../../topologies/Navbar';
import { LibroTheme } from '../../themes';

import { ChapterSearch } from './ChapterSearch';

const HEADER_PADDING = 4;

const useStyles = makeStyles<LibroTheme>((theme) => ({
  logoWrapper: {
    alignItems: 'center',
    display: 'flex',
    fontSize: '1.7rem',
    justifyContent: 'space-between',
    width: '230px',
  },
  nav: {
    '& picture': {
      display: 'flex',
    },
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'space-between',
    margin: 'auto',
    width: '100%',
  },
  root: {
    height: 'unset !important',
    minHeight: 'unset !important',
  },
  searchButton: {
    alignSelf: 'strech',
  },
  searchWrapper: {
    alignItems: 'center',
    display: 'flex',
    flexGrow: 1,
    gap: '10px',
    height: 'fit-content',
    maxWidth: 'min(100%, 400px)',
    minWidth: '200px',
  },
  wrapper: {
    padding: theme.spacing(HEADER_PADDING),
    position: 'static',
  },
}));

const AcademyHeader = (): JSX.Element => {
  const classes = useStyles();
  const websiteIRI = useWebsiteIRI();

  return (
    <Navbar
      fullWidth
      classes={({
        root: classes.root,
        wrapper: classes.wrapper,
      })}
    >
      <div className={classes.nav}>
        <NavLink
          className={classes.logoWrapper}
          to={retrievePath(websiteIRI)!}
        >
          <Resource subject={websiteIRI}>
            <Property label={ontola.navigationsMenu}>
              <Property label={ontola.menuItems} />
            </Property>
          </Resource>
          <span>
            Academy
          </span>
        </NavLink>
        <span className={classes.searchWrapper}>
          <ChapterSearch />
        </span>
      </div>
    </Navbar>
  );
};

export default AcademyHeader;
