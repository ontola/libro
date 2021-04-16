import { ThemeProvider } from '@material-ui/styles';
import { Resource } from 'link-redux';
import React from 'react';

import ErrorBoundary from '../../components/ErrorBoundary';
import app from '../../ontology/app';
import { Page } from '../../topologies/Page';
import ContentFrame from '../App/ContentFrame';
// @ts-ignore
import themes from '../../themes';
import { LIBRO_THEMES } from '../../themes/LibroThemes';

import { builderContext } from './builderContext';

const PageViewer = (): JSX.Element => {
  const {
    resourceIndex,
    resources,
    theme,
  } = React.useContext(builderContext);
  const currentResource = resources[Math.min(resources.length - 1, resourceIndex)];
  const footerResources = [
    app.ns('menus/footer/argu').value,
    app.ns('menus/footer/kb').value,
  ].join(',');
  const themeOptions = new URLSearchParams();
  themeOptions.set('footerResources', footerResources);

  return (
    <ErrorBoundary key={currentResource.value}>
      <ThemeProvider theme={themes[theme] || themes[LIBRO_THEMES.COMMON]}>
        <ContentFrame
          theme={theme!}
          themeOptions={themeOptions}
          title={`[PB]: ${currentResource.value}`}
        >
          <Page>
            <Resource subject={currentResource} />
          </Page>
        </ContentFrame>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default PageViewer;
