import CssBaseline from '@material-ui/core/CssBaseline';
import { ServerStyleSheets } from '@material-ui/core/styles';
import rdf, { createNS } from '@ontologies/core';
import { MemoryHistory, createMemoryHistory } from 'history';
import { MULTIPLE_CHOICES } from 'http-status-codes';
import { LinkReduxLRSType } from 'link-redux';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from '../../../../App';
import { AppContext, WebManifest } from '../../../../appContext';
import { AppContextProvider } from '../../../../AppContextProvider';
import { WebsiteCtx } from '../../../../helpers/app';
import generateLRS from '../../../../helpers/generateLRS';
import { trailing } from '../../../../ontology/app';
import { sliceIRI } from '../../../../ontology/appSlashless';
import {
  ProjectContext,
  RenderedPage,
  ServerData,
  subResource,
} from '../context/ProjectContext';
import { parseSource } from '../hooks/useGenerateLRSFromSource';
import { filterNodes, nodesToSitemap } from '../hooks/useSitemap';

import { projectToSource } from './projectToSource';
import { serializeHextuples } from './hextupleSerializer';

const projectToServerData = async (project: ProjectContext, prerender: boolean): Promise<ServerData> => {
  const manifest = project.manifest.value;
  const resources = JSON.stringify(project.website.children);
  const source = projectToSource(project);
  const [nodes, data] = parseSource(source, project.websiteIRI);
  const hextuples = serializeHextuples(data);
  const sitemap = nodesToSitemap(nodes);
  let pages: RenderedPage[] = [];

  if (prerender) {
    pages = (await renderProject(project))
      .filter((it): it is RenderedPage => !(it instanceof Error));
  }

  return {
    hextuples,
    manifestOverride: manifest,
    pages,
    resources,
    sitemap,
  };
};

const projectToBody = async (project: ProjectContext, prerender: boolean): Promise<string> =>
  JSON.stringify(await projectToServerData(project, prerender));

export const createProject = async (project: ProjectContext, prerender: boolean): Promise<Response> => {
  const body = await projectToBody(project, prerender);

  return await fetch('/_libro/docs', {
    body,
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });
};

export const updateProject = async (project: ProjectContext, prerender: boolean): Promise<Response> => {
  const body = await projectToBody(project, prerender);

  return await fetch(project.iri!, {
    body,
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
  });
};

const projectAppContext = (project: ProjectContext): Partial<AppContext> => {
  const manifest: WebManifest = JSON.parse(project.manifest.value);

  if (!manifest.ontola.theme) {
    throw new Error('No theme');
  }

  return {
    theme: manifest.ontola.theme,
    themeOpts: manifest.ontola.theme_options,
    website: manifest.ontola.website_iri,
  };
};

const projectWebsiteContext = (website: string | undefined): WebsiteCtx => {
  if (!website) {
    throw new Error('No website iri');
  }

  return {
    app: { ns: createNS(trailing(website)) },
    appSlashless: { ns: createNS(sliceIRI(website)) },

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
    <AppContextProvider
      appCtxOverrides={appCtx}
      lrs={lrs}
      manifest={manifest}
    >
      <CssBaseline />
      <App
        prerender
        history={history}
        websiteCtxOverride={websiteCtxValue}
      />
    </AppContextProvider>,
  ));

  return {
    content: content,
    path,
    sheet: sheets.toString(),
  };
};

export const renderCurrentResource = async (project: ProjectContext): Promise<RenderedPage> => {
  const source = projectToSource(project);
  const [, data] = parseSource(source, project.websiteIRI);
  const manifest = JSON.parse(project.manifest.value);
  const { lrs } = await generateLRS(manifest, data);
  const appContext = projectAppContext(project);
  const websiteCtxValue: WebsiteCtx = projectWebsiteContext(appContext.website);
  const history = createMemoryHistory();

  const resource = subResource(project);

  return renderResource(
    history,
    lrs,
    appContext,
    websiteCtxValue,
    manifest,
    resource.path,
  );
};

export const renderProject = async (project: ProjectContext): Promise<Array<RenderedPage | Error>> => {
  const source = projectToSource(project);
  const [nodes, data] = parseSource(source, project.websiteIRI);
  const manifest = JSON.parse(project.manifest.value);
  const { lrs } = await generateLRS(manifest, data);
  const history = createMemoryHistory();
  const sitemap = filterNodes(nodes);

  const appContext = projectAppContext(project);
  const websiteCtxValue: WebsiteCtx = projectWebsiteContext(appContext.website);

  const pages = [];

  for (const iri of sitemap) {
    try {
      const page = renderResource(
        history,
        lrs,
        appContext,
        websiteCtxValue,
        manifest,
        iri,
      );

      pages.push(page);
    } catch (e) {
      pages.push(e);
    }
  }

  return pages;
};

const execSave = async (project: ProjectContext, prerender: boolean): Promise<{ iri: string }> => {
  const method = project.iri ? updateProject : createProject;

  const res = await method(project, prerender);

  if (res.status >= MULTIPLE_CHOICES) {
    return Promise.reject();
  }

  const ctx = await res.json();

  return Promise.resolve(ctx);
};

export const savePrerender = async (project: ProjectContext): Promise<{ iri: string }> =>
  execSave(project, true);

export const saveProject = async (project: ProjectContext): Promise<{ iri: string }> =>
  execSave(project, false);
