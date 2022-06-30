import rdf from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { hextupleStringParser } from 'hextuples';
import { DataSlice } from 'link-lib/dist-types/store/StructuredStore';
import React, { Dispatch } from 'react';

import { defaultManifest } from '../../../../helpers/defaultManifest';
import {
  DeepSeed,
  DeepSeedDataRecord,
  Seed,
} from '../../../Common/lib/seed';
import { WebManifest } from '../../../Kernel/components/AppContext/WebManifest';
import { empJsonId, empJsonString } from '../../../Kernel/lib/empjsonSerializer';
import { quadruplesToDataSlice } from '../../../Kernel/lib/quadruplesToDataSlice';
import { sourceToSlice } from '../../lib/sourceToSlice';
import { compactDeepSeed } from '../lib/compactDeepSeed';
import { DistributionMetaWithIRI } from '../lib/distributionAgent';
import { hashProjectData } from '../lib/hashProject';
import { nestDeepSeed } from '../lib/nestDeepSeed';
import { nestSeed } from '../lib/nestSeed';
import { sliceToDeepSeed } from '../lib/sliceToDeepSeed';
import { sliceFromData } from '../lib/sliceFromData';
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
  sitemap: Component;
  website: Component;
  distributions: Component;
  manifest: WebManifest;
  selected: {
    origin: string;
    path: string;
  };
  serverDataHash: number;
  distributionToDeploy?: DistributionMetaWithIRI;
}

export const enum ProjectAction {
  Load,
  UpdateComponent,
  UpdateManifest,
  UpdateRDFSubResource,
  UpdateNestedRecord,
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
  record: DeepSeedDataRecord;
}

interface UpdateNestedRecordAction {
  type: ProjectAction.UpdateNestedRecord;
  path: string[];
  record: DeepSeedDataRecord;
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
  id?: string;
  path: string;
}

interface RenameResourceAction {
  type: ProjectAction.RenameResource;
  id?: string;
  path: string;
}

interface DeleteResourceAction {
  type: ProjectAction.DeleteResource;
  id?: string;
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
  dataType: 'dataslice' | 'source' | 'hextuples';
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
  | UpdateNestedRecordAction
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

const selectedToId = (selected: { origin: string, path: string }) => {
  if (origin === '/' && selected.path.startsWith('#')) {
    return selected.path;
  }

  return selected.origin + selected.path;
};

export const currentComponent = (project: ProjectContext): Component | WebManifest =>
  project[project.current];

export const selectedRecord = (project: ProjectContext): DeepSeedDataRecord | undefined =>
  project.data[selectedToId(project.selected)];

const importActionToDataSlice = (action: ImportDataAction, websiteIRI: string): DataSlice => {
  switch (action.dataType) {
  case 'dataslice':
    return sliceFromData(action.data, websiteIRI, window.EMP_SYMBOL_MAP);

  case 'source': {
    const slice = sourceToSlice(action.data, websiteIRI);

    return sliceFromData(slice, websiteIRI, window.EMP_SYMBOL_MAP);
  }

  case 'hextuples':
    return quadruplesToDataSlice(hextupleStringParser(action.data).map((quad) => rdf.qdrFromQuad(quad)));
  }
};

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
  data: {
    '/': {
      _id: empJsonId(rdf.namedNode('/')),
    },
  },
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
  selected: {
    origin: '/',
    path: '',
  },
  serverDataHash: 0,
  sitemap: resource(
    ComponentName.Sitemap,
    ResourceType.SiteMap,
    '',
  ),
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
    selected: {
      origin: '/',
      path: '',
    },
    sitemap,
    websiteIRI: data.manifest.ontola.website_iri,
  };
};

const appendPath = (path: string, name: string) => {
  if (name.startsWith('/')) {
    return name.slice(1);
  } else if (path) {
    const separator = name.startsWith('#') ? '' : '/';

    return `${path}${separator}${name}`;
  }

  return name;

};

const appendToSelected = (selected: { origin: string, path: string }, name: string): [path: string, id: string] => {
  const path = appendPath(selected.path, name);
  const id = `${selected.origin}${path}`;

  return [path, id];
};

const idToSelected = (id: string): { origin: string, path: string } => {
  if (id.startsWith('/') || id.startsWith('#')) {
    return {
      origin: '/',
      path: id.slice(1),
    };
  }

  const url = new URL(id);

  return {
    origin: url.origin,
    path: id.slice(url.origin.length),
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
      selected: {
        origin: state.selected.origin,
        path: action.id,
      },
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

  case ProjectAction.UpdateNestedRecord: {
    const data = {
      ...state.data,
    };

    if (action.path.length <= 1) {
      data[action.record._id.v] = action.record;
    } else {
      const [first, ...paths] = action.path;
      paths.reduce((cur: DeepSeedDataRecord, path, i) => {
        if (i === paths.length - 1) {
          cur[path] = action.record;
        }

        return cur[path] as DeepSeedDataRecord;
      }, data[first]);
    }

    return {
      ...state,
      data,
    };
  }

  case ProjectAction.UpdateRDFSubResource: {
    return {
      ...state,
      data: {
        ...state.data,
        [selectedToId(state.selected)]: action.record,
      },
    };
  }

  case ProjectAction.AddResource: {
    const selected = action.id ? idToSelected(action.id) : state.selected;
    const [path, id] = appendToSelected(selected, action.path);

    return {
      ...state,
      data: {
        ...state.data,
        [id]: {
          _id: empJsonId(rdf.namedNode(id)),
          [schema.name.value]: empJsonString(rdf.literal('')),
        },
      },
      selected: {
        origin: state.selected.origin,
        path: path,
      },
    };
  }

  case ProjectAction.RenameResource: {
    const id = action.id ?? selectedToId(state.selected);
    const { _id, ...fields } = state.data[id];

    const next = {
      ...state.data,
      [action.path]: {
        _id: empJsonId(rdf.namedNode(action.path)),
        ...fields,
      },
    };
    delete next[id];

    return {
      ...state,
      data: next,
    };
  }

  case ProjectAction.DeleteResource: {
    const id = action.id ?? selectedToId(state.selected);

    const {
      [id]: _discarded,
      ...data
    } = state.data;

    return {
      ...state,
      data,
      selected: {
        origin: '/',
        path: '',
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

  case ProjectAction.SetData: {
    return {
      ...state,
      data: action.seed,
    };
  }

  case ProjectAction.ImportData: {
    const slice = importActionToDataSlice(action, state.websiteIRI);
    const deepSeed = sliceToDeepSeed(slice);
    const nested = nestDeepSeed(deepSeed);
    const compacted = compactDeepSeed(nested, state.websiteIRI);

    return {
      ...state,
      data: compacted,
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
