import { useMediaQuery, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { Link } from 'react-router-dom';

import NavBarContent from '../../../components/NavBarContent';
import Navbar from '../../../topologies/Navbar';

const useStyles = makeStyles(() => ({
  logo: {
    flexBasis: '37em',
  },
  logoSmall: {
    '& img': {
      maxHeight: '2rem!important',
    },
    width: '10em',
  },
}));

const GroenLinksHeader = () => {
  const [logo, setLogo] = React.useState();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const classes = useStyles();
  const logoSmall = '/assets/logoSmall.png';

  React.useEffect(() => {
    // eslint-disable-next-line no-inline-comments
    import(/* webpackChunkName: "GroenLinksTheme" */ './Icon').then((encoded) => setLogo(encoded.default));
  });

  return (
    <Navbar>
      <NavBarContent>
        <Link
          className={matches ? classes.logo : classes.logoSmall}
          to="/"
        >
          <img alt="" src={matches ? logo : logoSmall} />
        </Link>
      </NavBarContent>
    </Navbar>
  );
};

export default GroenLinksHeader;
