import { makeStyles } from '@mui/styles';
import rdf, { Node } from '@ontologies/core';
import { Resource } from 'link-redux';
import React from 'react';
import { Helmet } from 'react-helmet-async';

import { CONTAINER_ELEMENT } from '../../config';
import Banners from '../../modules/Common/components/Banners';
import Footer from '../../modules/Common/topologies/Footer';
import { appContext } from '../../modules/Core/components/AppContext/appContext';
import NetworkStatusIndicator from '../../modules/Core/components/NetworkStatusIndicator';
import SkipNavigation from '../../modules/Core/components/SkipNavigation';
import libro from '../../modules/Core/ontology/libro';
import headers from '../../headers';
import { LibroTheme } from '../../modules/Common/theme/types';
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

// TODO: Find or build replacement for React router scroll memory.
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
          {children}
        </div>
        <Footer
          legacy={!footerResource}
          resources={footerResources}
        >
          {footerResource && <Resource subject={rdf.namedNode(footerResource)} />}
        </Footer>
        <Resource subject={libro.ns('snackbar/manager')} />
      </div>
    </HoverHelper>
  );
};

export default ContentFrame;
