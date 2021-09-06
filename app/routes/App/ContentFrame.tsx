import rdf, { Node } from '@ontologies/core';
import { Resource } from 'link-redux';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { HotKeys } from 'react-hotkeys';
// @ts-ignore
import ScrollMemory from 'react-router-scroll-memory';

import { appContext } from '../../appContext';
import { CONTAINER_ELEMENT } from '../../config';
import Banners from '../../components/Banners';
import NetworkStatusIndicator from '../../components/NetworkStatusIndicator';
import SkipNavigation from '../../components/SkipNavigation';
import HoverHelper from '../DevBrowser/HoverHelper';
import { defaultKeymap, devKeymap } from '../../helpers/keyboard';
import ontola from '../../ontology/ontola';
import Footer from '../../topologies/Footer';
import headers from '../../themes/headers';

export interface ContentFrameProps {
  children: React.ReactNode;
  title?: string;
}

const ContentFrame = ({
  children,
  title,
}: ContentFrameProps): JSX.Element => {
  const { theme, themeOpts } = React.useContext(appContext);

  const themeOptions = new URLSearchParams(themeOpts);
  const footerResources = (themeOptions.get('footerResources')?.split(',') ?? [])
    .map((iri) => rdf.namedNode(iri) as Node);
  const footerResource = themeOptions.get('footerResource');
  const Header = headers[theme ?? ''] ?? headers.common;

  return (
    <HotKeys
      root
      keyMap={__DEVELOPMENT__ ? devKeymap : defaultKeymap}
      tabIndex={null as unknown as undefined}
    >
      <HoverHelper>
        <Helmet
          defaultTitle={title}
          titleTemplate={title ? `%s - ${title}` : '%s'}
        />
        <SkipNavigation />
        <div
          className={CONTAINER_ELEMENT}
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
          <Resource subject={ontola.ns('snackbar/manager')} />
          <Resource subject={ontola.ns('dialog/manager')} />
        </div>
      </HoverHelper>
    </HotKeys>
  );
};

export default ContentFrame;
