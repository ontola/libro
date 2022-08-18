import CssBaseline from '@mui/material/CssBaseline';
import ServerStyleSheets from '@mui/styles/ServerStyleSheets';
import rdf, { createNS } from '@ontologies/core';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MemoryHistory, createMemoryHistory } from 'history';
import { LinkReduxLRSType } from 'link-redux';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from '../../../../components/App';
import generateLRS from '../../../../helpers/generateLRS';
import { trailing } from '../../../Common/ontology/app';
import { AppContext } from '../../../Kernel/components/AppContext/appContext';
import { WebManifest } from '../../../Kernel/components/AppContext/WebManifest';
import { WebsiteCtx } from '../../../Kernel/components/WebsiteContext/websiteContext';
import { removeTrailingSlash } from '../../../Kernel/lib/id';
import { quadruplesToDataSlice } from '../../../Kernel/lib/quadruplesToDataSlice';
import { modulesKey } from '../../../Kernel/lib/settings';
import { AppContextEditor } from '../../components/AppContextEditor';
import { ProjectContext } from '../context/ProjectContext';
import { parseSource } from '../hooks/useGenerateLRSFromSource';
import { projectToSitemap } from '../hooks/useSitemap';

import { projectToSource } from './projectToSource';
import { RenderedPage } from './types';

const projectAppContext = (project: ProjectContext): Partial<AppContext> => {
  if (!project.manifest.ontola.theme) {
    throw new Error('No theme');
  }

  return {
    theme: project.manifest.ontola.theme,
    themeOpts: project.manifest.ontola.theme_options,
    website: project.manifest.ontola.website_iri,
  };
};

const projectWebsiteContext = (website: string | undefined): WebsiteCtx => {
  if (!website) {
    throw new Error('No website iri');
  }

  return {
    app: { ns: createNS(trailing(website)) },
    appSlashless: { ns: createNS(removeTrailingSlash(website)) },

    websiteIRI: rdf.namedNode(website),
    websiteIRIStr: website,
    websiteOrigin: rdf.namedNode(new URL(website).origin),
    websitePathname: new URL('https://argu.localdev').pathname,
  };
};

const renderResource = (
  history: MemoryHistory,
  lrs: LinkReduxLRSType,
  appCtx: Partial<AppContext>,
  websiteCtxValue: WebsiteCtx,
  manifest: WebManifest,
  path: string,
): RenderedPage => {
  history.push(path);
  const sheets = new ServerStyleSheets();

  const content = ReactDOMServer.renderToStaticMarkup(sheets.collect(
    <AppContextEditor
      appCtxOverrides={appCtx}
      lrs={lrs}
      manifest={manifest}
    >
      <CssBaseline />
      <App
        prerender
        history={history}
        modules={lrs.settings.get(modulesKey)}
        websiteCtxOverride={websiteCtxValue}
      />
    </AppContextEditor>,
  ));

  return {
    content: content,
    path,
    sheet: sheets.toString(),
  };
};

export const renderProject = async (project: ProjectContext): Promise<Array<RenderedPage | Error>> => {
  const source = projectToSource(project);
  const [, data] = parseSource(source, project.websiteIRI);
  const { lrs } = await generateLRS(
    project.manifest,
    [],
    quadruplesToDataSlice(data),
    window.EMP_SYMBOL_MAP,
  );
  const history = createMemoryHistory();
  const sitemap = projectToSitemap(project);

  const appContext = projectAppContext(project);
  const websiteCtxValue: WebsiteCtx = projectWebsiteContext(appContext.website);

  const pages: Array<RenderedPage | Error> = [];

  for (const iri of sitemap) {
    try {
      const page = renderResource(
        history,
        lrs,
        appContext,
        websiteCtxValue,
        project.manifest,
        iri,
      );

      pages.push(page);
    } catch (e) {
      pages.push(e as Error);
    }
  }

  return pages;
};
