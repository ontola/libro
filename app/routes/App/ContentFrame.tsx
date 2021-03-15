import rdf, { Node } from '@ontologies/core';
import { Resource } from 'link-redux';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { HotKeys } from 'react-hotkeys';
// @ts-ignore
import ScrollMemory from 'react-router-scroll-memory';

import { CONTAINER_ELEMENT } from '../../config';
// @ts-ignore
import NetworkStatusIndicator from '../../components/NetworkStatusIndicator';
// @ts-ignore
import SkipNavigation from '../../components/SkipNavigation';
// @ts-ignore
import HoverHelper from '../DevBrowser/HoverHelper';
import { defaultKeymap, devKeymap } from '../../helpers/keyboard';
import app from '../../ontology/app';
import ontola from '../../ontology/ontola';
import Footer from '../../topologies/Footer';
import Popup from '../../topologies/Popup';
// @ts-ignore
import headers from '../../themes/headers';

export interface ContentFrameProps {
  children: React.ReactNode;
  footResources: string[];
  theme: string;
  themeOptions: URLSearchParams;
  title: string;
}

const ContentFrame = ({
  children,
  theme,
  themeOptions,
  title,
}: ContentFrameProps): JSX.Element => {
  const footerResources = (themeOptions.get('footerResources')?.split(',') ?? [])
    .map((iri) => rdf.namedNode(iri) as Node);
  const Header = headers[theme] || headers.common;

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
        <div className={CONTAINER_ELEMENT} id={CONTAINER_ELEMENT}>
          <Header footerResources={footerResources} />
          <div className="Banners">
            <Resource subject={app.bannerMembers} />
          </div>
          <NetworkStatusIndicator />
          <div id="start-of-content">
            <ScrollMemory />
            {children}
          </div>
          <Footer resources={footerResources} />
          <Resource subject={ontola.ns('snackbar/manager')} />
          <Resource subject={ontola.ns('dialog/manager')} />
          <Popup />
        </div>
      </HoverHelper>
    </HotKeys>
  );
};

export default ContentFrame;
