import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

import { ChapterSearch } from './ChapterSearch';

const useStyles = makeStyles({
  logoWrapper: {
    alignItems: 'center',
    display: 'flex',
    fontSize: '1.7rem',
    justifyContent: 'space-between',
    width: '230px',
  },
  nav: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'space-between',
    margin: 'auto',
    padding: '0.5rem',
    paddingBottom: '0px',
    width: '90%',
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
});

const AcademyHeader = (): JSX.Element => {
  const classNames = useStyles();

  return (
    <nav className={classNames.nav}>
      <span className={classNames.logoWrapper}>
        <img alt="the argu logo" src="/static/images/academy/argu_logo.svg" />
        <span>Academy</span>
      </span>
      <span className={classNames.searchWrapper}>
        <ChapterSearch />
        <Button color="secondary" variant="contained">Zoek</Button>
      </span>
    </nav>
  );
};

export default AcademyHeader;
