import { Resource } from 'link-redux';
import React from 'react';

import ErrorBoundary from '../../components/ErrorBoundary';
import app from '../../ontology/app';
import { Page } from '../../topologies/Page';
import ContentFrame from '../App/ContentFrame';

import { builderContext } from './builderContext';

const PageViewer = (): JSX.Element => {
  const { index, resources } = React.useContext(builderContext);
  const currentResource = resources[index];
  const theme = 'salesWebsite';
  const footerResources = [
    app.ns('menus/footer/argu').value,
    app.ns('menus/footer/kb').value,
  ].join(',');
  const themeOptions = new URLSearchParams();
  themeOptions.set('footerResources', footerResources);

  return (
    <ErrorBoundary key={currentResource.value}>
      <ContentFrame
        theme={theme}
        themeOptions={themeOptions}
        title={`[PB]: ${currentResource.value}`}
      >
        <Page>
          <Resource subject={currentResource} />
        </Page>
      </ContentFrame>
    </ErrorBoundary>
  );
};

export default PageViewer;
