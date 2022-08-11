import { MULTIPLE_CHOICES } from 'http-status-codes';

import { ProjectContext, ServerData } from '../context/ProjectContext';
import { projectToSitemap } from '../hooks/useSitemap';

import { expandDeepSeed } from './expandDeepSeed';
import { flattenSeed } from './flattenSeed';
import { renderProject } from './renderProject';
import { RenderedPage } from './types';

const projectToServerData = async (project: ProjectContext, prerender: boolean): Promise<ServerData> => {
  const data = flattenSeed(expandDeepSeed(project.data, project.websiteIRI));
  const sitemap = projectToSitemap(project);
  let pages: RenderedPage[] = [];

  if (prerender) {
    pages = (await renderProject(project))
      .filter((it): it is RenderedPage => !(it instanceof Error));
  }

  return {
    data,
    manifest: project.manifest,
    pages,
    sitemap,
  };
};

const projectToBody = async (project: ProjectContext, prerender: boolean): Promise<string> =>
  JSON.stringify(await projectToServerData(project, prerender));

export const createProject = async (project: ProjectContext, prerender: boolean): Promise<Response> => {
  const body = await projectToBody(project, prerender);

  return fetch('/_studio/projects', {
    body,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });
};

export const updateProject = async (project: ProjectContext, prerender: boolean): Promise<Response> => {
  const body = await projectToBody(project, prerender);

  return fetch(project.iri!, {
    body,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'PUT',
  });
};

const execSave = async (project: ProjectContext, prerender: boolean): Promise<{ iri: string; }> => {
  const method = project.iri ? updateProject : createProject;

  const res = await method(project, prerender);

  if (res.status >= MULTIPLE_CHOICES) {
    return Promise.reject();
  }

  const ctx = await res.json();

  return Promise.resolve(ctx);
};

export const savePrerender = async (project: ProjectContext): Promise<{ iri: string; }> =>
  execSave(project, true);

export const saveProject = async (project: ProjectContext): Promise<{ iri: string; }> =>
  execSave(project, false);
