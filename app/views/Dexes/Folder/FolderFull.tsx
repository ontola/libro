import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import {
  FC,
  LinkedPropType,
  register,
  useDataFetching,
  useFindSubject,
  useGlobalIds,
  useIds,
} from 'link-redux';
import React from 'react';

import { components } from '../../../components';
import { useViewBuilderToolkit } from '../../../helpers/builder';
import dexes from '../../../ontology/dexes';
import ontola from '../../../ontology/ontola';
import { containerTopology } from '../../../topologies/Container';
import { containerHeaderTopology } from '../../../topologies/Container/ContainerHeader';
import { fullResourceTopology } from '../../../topologies/FullResource';

import UploadTarget from './UploadTarget';

interface FolderFullProps {
  renderPartOf: LinkedPropType;
}

const FolderFull: FC<FolderFullProps> = ({ renderPartOf }) => {
  const { c, p } = useViewBuilderToolkit();
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
        renderPartOf && p(schema.isPartOf),
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
