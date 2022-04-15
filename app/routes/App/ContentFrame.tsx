import { makeStyles } from '@material-ui/styles';
import rdf, { Node } from '@ontologies/core';
import { Resource } from 'link-redux';
import React from 'react';
import { Helmet } from 'react-helmet-async';
// @ts-ignore
import ScrollMemory from 'react-router-scroll-memory';

import { appContext } from '../../appContext';
import Banners from '../../components/Banners';
import NetworkStatusIndicator from '../../components/NetworkStatusIndicator';
import SkipNavigation from '../../components/SkipNavigation';
import { CONTAINER_ELEMENT } from '../../config';
import libro from '../../ontology/libro';
import headers from '../../themes/headers';
import { LibroTheme } from '../../themes/themes';
import Footer from '../../topologies/Footer';
import HoverHelper from '../DevBrowser/HoverHelper';

export interface ContentFrameProps {
  children: React.ReactNode;
  title?: string;
}

const useStyles = makeStyles<LibroTheme>((theme) => ({
  appContainer: {
    '& #start-of-content': {
      flex: 1,
      position: 'relative',
    },
    '& .preloader': {
      backgroundColor: theme.palette.background.default,
      opacity: 1,
      top: 0,
      zIndex: theme.zIndexLoader,
    },
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
}));

const ContentFrame = ({
  children,
  title,
}: ContentFrameProps): JSX.Element => {
  const classes = useStyles();
  const { theme, themeOpts } = React.useContext(appContext);

  const themeOptions = new URLSearchParams(themeOpts);
  const footerResources = (themeOptions.get('footerResources')?.split(',') ?? [])
    .map((iri) => rdf.namedNode(iri) as Node);
  const footerResource = themeOptions.get('footerResource');
  const Header = headers[theme ?? ''] ?? headers.common;

  return (
    <HoverHelper>
      <Helmet
        defaultTitle={title}
        titleTemplate={title ? `%s - ${title}` : '%s'}
      />
      <SkipNavigation />
      <div
        className={classes.appContainer}
        id={CONTAINER_ELEMENT}
      >
        <Header themeOptions={themeOptions} />
        <Banners />
        <NetworkStatusIndicator />
        <div id="start-of-content">
          <ScrollMemory />
          {children}
        </div>
        <Footer
          legacy={!footerResource}
          resources={footerResources}
        >
          {footerResource && <Resource subject={rdf.namedNode(footerResource)} />}
        </Footer>
        <Resource subject={libro.ns('snackbar/manager')} />
        <Resource subject={libro.ns('dialog/manager')} />
      </div>
    </HoverHelper>
  );
};

export default ContentFrame;
