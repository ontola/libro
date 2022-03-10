import React, { Dispatch } from 'react';

import { WebManifest } from '../../../../WebManifest';
import { DistributionMetaWithIRI } from '../lib/distributionAgent';
import { hashProjectData } from '../lib/hashProject';
import { serverDataToProject } from '../lib/serverDataToProject';
import { subResourcesFromData } from '../lib/subResourcesFromData';

export interface RenderedPage {
  path: string;
  content: string;
  sheet: string;
}

export interface ServerData {
  /** Only on write */
  hextuples: string[][];
  manifest: WebManifest;
  /** Only on write */
  pages?: RenderedPage[];
  /**
   * JSON string of {SubResource}
   */
  resources: SubResource[];
  sitemap: string;
}

// Keep in sync with /cache/src/commonMain/kotlin/io/ontola/studio/Project.kt
export enum ResourceType {
  RDF = 'RDF',
  Manifest = 'Manifest',
  Elements = 'Elements',
  MediaObject = 'MediaObject',
  SiteMap = 'SiteMap',
  Distributions = 'Distributions',
}

export interface Editable {
  type: ResourceType;
  name: string;
}

export interface SubResource extends Editable {
  id: number;
  path: string;
  prerender?: RenderedPage;
  value: string;
}

export interface Component extends Editable {
  children: SubResource[];
  name: ComponentName;
  value: string;
}

export enum ComponentName {
  Manifest = 'manifest',
  Sitemap = 'sitemap',
  Website = 'website',
  Distributions = 'distributions',
}

export enum DialogType {
  Import,
  CreateDistribution,
  Deploy,
}

export interface ProjectContextReaderProps {
  project: ProjectContext;
}

export interface ProjectContextProps extends ProjectContextReaderProps {
  dispatch: Dispatch<Action>;
}

export interface ProjectContext {
  current: ComponentName;
  dialog: DialogType | undefined;
  name: string | undefined;
  iri: string | undefined;
  websiteIRI: string;
  loading: boolean;
  manifest: Component,
  sitemap: Component,
  website: Component,
  distributions: Component,
  subResource: number;
  serverDataHash: number;
  distributionToDeploy?: DistributionMetaWithIRI;
}

export enum ProjectAction {
  Load,
  UpdateComponent,
  UpdateRDFSubResource,
  SetFile,
  SetResource,
  Close,
  UpdateProjectIRI,
  Finished,
  AddResource,
  DeleteResource,
  ShowDeployDialog,
  ShowDialog,
  ImportData,
  CreateDistribution,
  DeleteDistribution,
  HashProjectData,
}

interface UpdateComponentAction {
  type: ProjectAction.UpdateComponent;
  id: ComponentName;
  value: string
}

interface UpdateSubRDFResourceAction {
  type: ProjectAction.UpdateRDFSubResource;
  id: number;
  data: Partial<SubResource>;
}

interface SetFileAction {
  type: ProjectAction.SetFile;
  id: ComponentName;
}

interface SetResourceAction {
  type: ProjectAction.SetResource;
  id: number;
}

interface UpdateProjectIRIAction {
  type: ProjectAction.UpdateProjectIRI;
  iri: string;
}

interface LoadAction {
  type: ProjectAction.Load;
  iri: string | undefined;
}

interface FinishedAction {
  type: ProjectAction.Finished;
  data: ServerData;
}

interface CloseAction {
  type: ProjectAction.Close;
}

interface AddResourceAction {
  type: ProjectAction.AddResource;
}

interface DeleteResourceAction {
  type: ProjectAction.DeleteResource;
}

interface ShowDialogAction {
  type: ProjectAction.ShowDialog;
  dialogType: Exclude<DialogType, DialogType.Deploy> | undefined;
}

interface ShowDeployDialogAction {
  type: ProjectAction.ShowDeployDialog;
  distributionToDeploy: DistributionMetaWithIRI;
}

interface ImportDataAction {
  type: ProjectAction.ImportData;
  data: string;
}

interface CreateDistributionAction {
  type: ProjectAction.CreateDistribution;
}

interface DeleteDistributionAction {
  type: ProjectAction.DeleteDistribution;
}

interface HashProjectData {
  type: ProjectAction.HashProjectData;
}

export type Action = UpdateComponentAction
  | UpdateSubRDFResourceAction
  | SetFileAction
  | SetResourceAction
  | LoadAction
  | CloseAction
  | UpdateProjectIRIAction
  | FinishedAction
  | AddResourceAction
  | DeleteResourceAction
  | ShowDialogAction
  | ShowDeployDialogAction
  | ImportDataAction
  | CreateDistributionAction
  | DeleteDistributionAction
  | HashProjectData;

export type ProjectState = [ProjectContext, Dispatch<Action>];

export const projectContext = React.createContext<ProjectState>([
  {} as any,
  () => undefined,
]);

export const currentComponent = (project: ProjectContext): Component =>
  project[project.current];

export const subResource = (project: ProjectContext): SubResource =>
  currentComponent(project).children[project.subResource];

const resource = (r: Partial<Component>): Component => ({
  children: [],
  type: ResourceType.RDF,
  value: '',
  ...r,
}) as Component;

const initialState: ProjectContext = {
  current: ComponentName.Manifest,
  dialog: undefined,
  distributions: resource({
    name: ComponentName.Distributions,
    type: ResourceType.Distributions,
  }),
  iri: undefined,
  loading: false,
  manifest: {
    children: [],
    name: ComponentName.Manifest,
    type: ResourceType.Manifest,
    value: '{}',
  },
  name: undefined,
  serverDataHash: 0,
  sitemap: resource({
    name: ComponentName.Sitemap,
    type: ResourceType.SiteMap,
  }),
  subResource: 0,
  website: resource({
    name: ComponentName.Website,
    type: ResourceType.RDF,
  }),
  websiteIRI: 'https://changeme.localdev/',
};

export const emptySubResource = (id: number): SubResource => ({
  id,
  name: `website-${id}`,
  path: `/${id}`,
  type: ResourceType.RDF,
  value: '',
});

const reducer = (state: ProjectContext, action: Action): ProjectContext => {
  switch (action.type) {
  case ProjectAction.Load:
    return {
      ...state,
      iri: action.iri,
      loading: true,
    };

  case ProjectAction.SetFile:
    return {
      ...state,
      current: action.id,
    };

  case ProjectAction.SetResource:
    return {
      ...state,
      subResource: action.id,
    };

  case ProjectAction.UpdateProjectIRI:
    return {
      ...state,
      iri: action.iri,
    };

  case ProjectAction.Finished: {
    return {
      ...state,
      loading: false,
      ...serverDataToProject(action.data),
    };
  }

  case ProjectAction.UpdateComponent: {
    let websiteIRI = state.websiteIRI;

    if (action.id === 'manifest') {
      try {
        const manifest = JSON.parse(action.value);
        websiteIRI = manifest?.ontola?.website_iri ?? state.websiteIRI;
      } catch (e) {
        //
      }
    }

    return {
      ...state,
      websiteIRI,
      [action.id]: {
        ...state[action.id],
        value: action.value,
      },
    };
  }

  case ProjectAction.UpdateRDFSubResource: {
    const nextChildren = [...state.website.children];
    nextChildren[action.id] = {
      ...nextChildren[action.id],
      ...action.data,
    };

    return {
      ...state,
      website: {
        ...state.website,
        children: nextChildren,
      },
    };
  }

  case ProjectAction.AddResource: {
    const id = state.website.children.length;

    return {
      ...state,
      subResource: id,
      website: {
        ...state.website,
        children: [
          ...state.website.children,
          emptySubResource(id),
        ],
      },
    };
  }

  case ProjectAction.DeleteResource: {
    const toRemove = state.subResource;

    return {
      ...state,
      subResource: 0,
      website: {
        ...state.website,
        children: state.website.children
          .filter(({ id }) => id !== toRemove)
          .map((r, id) => ({
            ...r,
            id,
            name: `website-${id}`,
          })),
      },
    };
  }

  case ProjectAction.ShowDialog:
    return {
      ...state,
      dialog: action.dialogType,
      distributionToDeploy: undefined,
    };

  case ProjectAction.ShowDeployDialog:
    return {
      ...state,
      dialog: DialogType.Deploy,
      distributionToDeploy: action.distributionToDeploy,
    };

  case ProjectAction.ImportData:
    return {
      ...state,
      website: {
        ...state.website,
        children: subResourcesFromData(action.data, state.websiteIRI),
      },
    };

  case ProjectAction.HashProjectData:
    return {
      ...state,
      serverDataHash: hashProjectData(state),
    };

  default:
    return state;
  }
};

export const useProjectStateReducer = (): ProjectState =>
  React.useReducer(reducer, initialState);

// export const useProjectState = (): ProjectState => React.useContext(projectContext);
