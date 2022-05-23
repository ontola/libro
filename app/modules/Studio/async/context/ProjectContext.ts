import rdf from '@ontologies/core';
import * as schema from '@ontologies/schema';
import React, { Dispatch } from 'react';

import { defaultManifest } from '../../../../helpers/defaultManifest';
import {
  DeepSeed,
  DeepSeedDataRecord,
  Seed,
} from '../../../Common/lib/seed';
import { WebManifest } from '../../../Kernel/components/AppContext/WebManifest';
import { empJsonId, empJsonString } from '../../../Kernel/lib/empjsonSerializer';
import { sourceToSlice } from '../../lib/sourceToSlice';
import { compactDeepSeed } from '../lib/compactDeepSeed';
import { DistributionMetaWithIRI } from '../lib/distributionAgent';
import { hashProjectData } from '../lib/hashProject';
import { nestSeed } from '../lib/nestSeed';
import { sliceToDeepSeed } from '../lib/sliceToDeepSeed';
import { subResourcesFromData } from '../lib/subResourcesFromData';
import {
  Editable,
  RenderedPage,
  ResourceType,
  SubResource,
} from '../lib/types';

export interface ServerData {
  data: Seed;
  manifest: WebManifest;
  /** Only on write */
  pages?: RenderedPage[];
  sitemap: string;
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
  Export,
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
  data: DeepSeed;
  dialog: DialogType | undefined;
  name: string | undefined;
  iri: string | undefined;
  websiteIRI: string;
  loading: boolean;
  sitemap: Component,
  website: Component,
  distributions: Component,
  manifest: WebManifest,
  subResource: string;
  serverDataHash: number;
  distributionToDeploy?: DistributionMetaWithIRI;
}

export const enum ProjectAction {
  Load,
  UpdateComponent,
  UpdateManifest,
  UpdateRDFSubResource,
  SetFile,
  SetResource,
  Close,
  UpdateProjectIRI,
  Finished,
  AddResource,
  RenameResource,
  DeleteResource,
  ShowDeployDialog,
  ShowDialog,
  ImportData,
  SetData,
  CreateDistribution,
  DeleteDistribution,
  HashProjectData,
}

interface UpdateManifestAction {
  type: ProjectAction.UpdateManifest;
  value: WebManifest;
}

interface UpdateComponentAction {
  type: ProjectAction.UpdateComponent;
  id: ComponentName;
  value: string;
}

interface UpdateSubRDFResourceAction {
  type: ProjectAction.UpdateRDFSubResource;
  id: string;
  record: DeepSeedDataRecord,
}

interface SetFileAction {
  type: ProjectAction.SetFile;
  id: ComponentName;
}

interface SetResourceAction {
  type: ProjectAction.SetResource;
  id: string;
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
  path: string;
}

interface RenameResourceAction {
  type: ProjectAction.RenameResource;
  path: string;
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

interface SetDataAction {
  type: ProjectAction.SetData;
  seed: DeepSeed;
}

interface ImportDataAction {
  type: ProjectAction.ImportData;
  dataType: 'parsed_deepslice' | 'dataslice' | 'source';
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
  | UpdateManifestAction
  | UpdateSubRDFResourceAction
  | SetFileAction
  | SetResourceAction
  | LoadAction
  | CloseAction
  | UpdateProjectIRIAction
  | FinishedAction
  | AddResourceAction
  | RenameResourceAction
  | DeleteResourceAction
  | ShowDialogAction
  | ShowDeployDialogAction
  | ImportDataAction
  | SetDataAction
  | CreateDistributionAction
  | DeleteDistributionAction
  | HashProjectData;

export type ProjectState = [ProjectContext, Dispatch<Action>];

export const projectContext = React.createContext<ProjectState>([
  {} as any,
  () => undefined,
]);

export const currentComponent = (project: ProjectContext): Component | WebManifest =>
  project[project.current];

export const selectedRecord = (project: ProjectContext): DeepSeedDataRecord | undefined =>
  project.data[project.subResource];

const resource = (
  name: ComponentName,
  type: ResourceType,
  value: string,
  children = [],
): Component => ({
  children: children,
  name: name,
  type: type,
  value: value,
});

const initialState: ProjectContext = {
  current: ComponentName.Manifest,
  data: {},
  dialog: undefined,
  distributions: resource(
    ComponentName.Distributions,
    ResourceType.Distributions,
    '',
  ),
  iri: undefined,
  loading: false,
  manifest: defaultManifest('https://changeme.localdev/'),
  name: undefined,
  serverDataHash: 0,
  sitemap: resource(
    ComponentName.Sitemap,
    ResourceType.SiteMap,
    '',
  ),
  subResource: '/',
  website: resource(
    ComponentName.Website,
    ResourceType.RDF,
    '',
  ),
  websiteIRI: 'https://changeme.localdev/',
};

const serverDataToProject = (data: ServerData): Partial<ProjectContext> => {
  const sitemap: Component = {
    children: [],
    name: ComponentName.Sitemap,
    type: ResourceType.SiteMap,
    value: data.sitemap,
  };

  return {
    data: compactDeepSeed(nestSeed(data.data), data.manifest.ontola.website_iri),
    loading: false,
    manifest: data.manifest,
    sitemap,
    subResource: '/',
    websiteIRI: data.manifest.ontola.website_iri,
  };
};

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

  case ProjectAction.UpdateManifest: {
    return {
      ...state,
      manifest: action.value,
      websiteIRI: action.value.ontola?.website_iri ?? state.websiteIRI,
    };
  }

  case ProjectAction.UpdateComponent: {
    return {
      ...state,
      [action.id]: {
        ...state[action.id],
        value: action.value,
      },
    };
  }

  case ProjectAction.UpdateRDFSubResource: {
    return {
      ...state,
      data: {
        ...state.data,
        [state.subResource]: action.record,
      },
    };
  }

  case ProjectAction.AddResource: {
    return {
      ...state,
      data: {
        ...state.data,
        [action.path]: {
          _id: empJsonId(rdf.namedNode(action.path)),
          [schema.name.value]: empJsonString(rdf.literal('')),
        },
      },
      subResource: action.path,
    };
  }

  case ProjectAction.RenameResource: {
    const { _id, ...fields } = state.data[state.subResource];

    const next = {
      ...state.data,
      [action.path]: {
        _id: empJsonId(rdf.namedNode(action.path)),
        ...fields,
      },
    };
    delete next[state.subResource];

    return {
      ...state,
      data: next,
    };
  }

  case ProjectAction.DeleteResource: {
    const {
      [state.subResource]: _discarded,
      ...data
    } = state.data;

    return {
      ...state,
      data,
      subResource: '/',
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

  case ProjectAction.SetData: {
    return {
      ...state,
      data: action.seed,
    };
  }

  case ProjectAction.ImportData: {
    const rawData = action.dataType === 'dataslice'
      ? action.data
      : sourceToSlice(action.data, state.websiteIRI);
    const slice = subResourcesFromData(rawData, state.websiteIRI, window.EMP_SYMBOL_MAP);
    const deepSeed = sliceToDeepSeed(slice);

    return {
      ...state,
      data: deepSeed,
    };
  }

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
