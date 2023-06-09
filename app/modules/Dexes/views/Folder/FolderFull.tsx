import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useDataFetching,
  useFindSubject,
  useGlobalIds,
  useIds,
  useLRS,
} from 'link-redux';
import React from 'react';

import { components } from '../../../../components';
import { property } from '../../../Common/lib/properties';
import {
  containerHeaderTopology,
  containerTopology,
  fullResourceTopology,
} from '../../../Common/topologies';
import component from '../../../Common/lib/component';
import ontola from '../../../Kernel/ontology/ontola';
import dexes from '../../ontology/dexes';

import UploadTarget from './UploadTarget';

const FolderFull: FC = () => {
  const lrs = useLRS();
  const c = component();
  const p = property(lrs);
  const createActions = useGlobalIds(ontola.createAction);
  useDataFetching(createActions);
  const [uploadAction] = useFindSubject(
    [ontola.createAction, rdfx.type],
    ontola['Create::MediaObject'],
  );
  const [entries] = useIds(dexes.entries);

  return (
    c(components.ResourceBoundary, [
      c(containerTopology, [
        entries && (
          c(components.CollectionProvider, { subject: entries }, [
            c(containerHeaderTopology, { float: p(dexes.entries, c(components.HeaderFloat)) }, [
              p(schema.name),
            ]),
            <UploadTarget
              key="UploadTarget"
              uploadAction={uploadAction}
            >
              {p(dexes.entries, {
                hideHeader: true,
                renderWhenEmpty: true,
              })}
            </UploadTarget>,
          ])
        ),
      ]),
    ])
  );
};

FolderFull.type = dexes.Folder;

FolderFull.topology = [
  fullResourceTopology,
];

export default register(FolderFull);
