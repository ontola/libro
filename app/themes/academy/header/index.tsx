import { makeStyles } from '@material-ui/styles';
import { Property, Resource } from 'link-redux';
import React from 'react';
import { NavLink } from 'react-router-dom';

import retrievePath from '../../../helpers/iris';
import { frontendIRI } from '../../../ontology/app';
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
    paddingBottom: '0px',
    paddingTop: '0.5rem',
    width: '100%',
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
  },
}));

const AcademyHeader = (): JSX.Element => {
  const classNames = useStyles();

  return (
    <Navbar
      fullWidth
      classes={({ wrapper: classNames.wrapper })}
    >
      <div className={classNames.nav}>
        <NavLink
          className={classNames.logoWrapper}
          to={retrievePath(frontendIRI)!}
        >
          <Resource subject={frontendIRI}>
            <Property label={ontola.navigationsMenu}>
              <Property label={ontola.menuItems} />
            </Property>
          </Resource>
          <span>
            Academy
          </span>
        </NavLink>
        <span className={classNames.searchWrapper}>
          <ChapterSearch />
        </span>
      </div>
    </Navbar>
  );
};

export default AcademyHeader;
