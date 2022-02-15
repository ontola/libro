import * as rdfx from '@ontologies/rdf';
import {
  Property,
  register,
  useDataFetching,
  useFindSubject,
  useGlobalIds,
} from 'link-redux';
import React from 'react';

import dexes from '../../../ontology/dexes';
import ontola from '../../../ontology/ontola';
import { containerTopology } from '../../../topologies/Container';

import UploadTarget from './UploadTarget';

const FolderContainer = () => {
  const createActions = useGlobalIds(ontola.createAction);
  useDataFetching(createActions);
  const [uploadAction] = useFindSubject(
    [ontola.createAction, rdfx.type],
    ontola['Create::MediaObject'],
  );

  return (
    <UploadTarget
      key="UploadTarget"
      uploadAction={uploadAction}
    >
      <Property label={dexes.entries} />
    </UploadTarget>
  );
};

FolderContainer.type = dexes.Folder;

FolderContainer.topology = [
  containerTopology,
];

export default register(FolderContainer);
