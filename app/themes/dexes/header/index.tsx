import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { NavLink } from 'react-router-dom';

import NavBarContent from '../../../components/NavBarContent';
import retrievePath from '../../../helpers/iris';
import { frontendIRI } from '../../../ontology/app';
import Navbar from '../../../topologies/Navbar';
import { LibroTheme } from '../../themes';

const useStyles = makeStyles<LibroTheme>((theme) => ({
  logoWrapper: {
    '& img': {
      maxHeight: '100%',
    },
    display: 'inline-block',
    height: theme.appBar.height,
  },
  wrapper: {
    marginTop: '1em',
  },
}));

const DexesHeader = (): JSX.Element => {
  const classes = useStyles();
  const [logo, setLogo] = React.useState<string | undefined>();
  React.useEffect(() => {
    // eslint-disable-next-line no-inline-comments
    import(/* webpackChunkName: "DutchGovernmentTheme" */ './Logo').then((encoded) => setLogo(encoded.default));
  });

  return (
    <div className={classes.wrapper}>
      <Container maxWidth="xl">
        <NavLink
          className={classes.logoWrapper}
          to={retrievePath(frontendIRI)!}
        >
          <img
            alt="Dexes logo"
            src={logo}
          />
        </NavLink>
        <Navbar
          float
        >
          <NavBarContent />
        </Navbar>
      </Container>
    </div>
  );
};

export default DexesHeader;
