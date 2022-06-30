import { useMediaQuery, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { Link } from 'react-router-dom';

import NavBarContent from '../../../modules/NavBar/components/NavBarContent';
import Navbar from '../../../modules/NavBar/topologies/Navbar';
import { BreakPoints } from '../../themes';

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

const GroenLinksHeader = (): JSX.Element => {
  const [logo, setLogo] = React.useState<string | undefined>();
  const theme = useTheme();
  const screenIsWide = useMediaQuery(theme.breakpoints.up(BreakPoints.Medium));
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
          className={screenIsWide ? classes.logo : classes.logoSmall}
          to="/"
        >
          <img
            alt=""
            src={screenIsWide ? logo : logoSmall}
          />
        </Link>
      </NavBarContent>
    </Navbar>
  );
};

export default GroenLinksHeader;
