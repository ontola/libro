import * as rdfx from '@ontologies/rdf';
import {
  FC,
  register,
  useDataFetching,
  useFindSubject,
  useGlobalIds,
} from 'link-redux';
import React from 'react';

import { components } from '../../../components';
import { useViewBuilderToolkit } from '../../../helpers/builder';
import dexes from '../../../ontology/dexes';
import ontola from '../../../ontology/ontola';
import { containerTopology } from '../../../topologies/Container';
import { fullResourceTopology } from '../../../topologies/FullResource';

import UploadTarget from './UploadTarget';

const FolderFull: FC = () => {
  const { c, p } = useViewBuilderToolkit();
  const createActions = useGlobalIds(ontola.createAction);
  useDataFetching(createActions);
  const [uploadAction] = useFindSubject(
    [ontola.createAction, rdfx.type],
    ontola['Create::MediaObject'],
  );

  return (
    c(components.ResourceBoundary, [
      c(containerTopology, [
        <UploadTarget
          key="UploadTarget"
          uploadAction={uploadAction}
        >
          {p(dexes.entries)}
        </UploadTarget>,
      ]),
    ])
  );
};

FolderFull.type = dexes.Folder;

FolderFull.topology = [
  fullResourceTopology,
];

export default register(FolderFull);
