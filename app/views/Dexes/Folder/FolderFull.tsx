import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  FC,
  LinkedPropType,
  ReturnType,
  register,
  useDataFetching,
  useLRS,
  useProperty,
} from 'link-redux';
import React from 'react';

import { components } from '../../../components';
import { useViewBuilderToolkit } from '../../../helpers/builder';
import dexes from '../../../ontology/dexes';
import ontola from '../../../ontology/ontola';
import { containerTopology } from '../../../topologies/Container';
import { fullResourceTopology } from '../../../topologies/FullResource';

import UploadTarget from './UploadTarget';

interface FolderFullProps {
  renderPartOf: LinkedPropType;
}

const FolderFull: FC<FolderFullProps> = ({ renderPartOf, subject }) => {
  const { c, p } = useViewBuilderToolkit();
  const lrs = useLRS();
  const createActions = useProperty(ontola.createAction, { returnType: ReturnType.AllTerms });
  useDataFetching(createActions as SomeNode[]);
  const uploadAction = lrs.findSubject(subject!, [ontola.createAction, rdfx.type], ontola['Create::MediaObject']).pop();

  return (
    c(components.ResourceBoundary, [
        c(containerTopology, [
          renderPartOf && p(schema.isPartOf),
          c(components.ContainerHeader, { float: p(dexes.entries, c(components.HeaderFloat)) }, [
            p(schema.name),
          ]),
          <UploadTarget key="UploadTarget" uploadAction={uploadAction}>
            {p(dexes.entries, {
                hideHeader: true,
                renderWhenEmpty: true,
            })}
          </UploadTarget>,
          // c(containerTopology, [
          // p(ontola.favoriteAction),
          // ]),
        ]),
      ])
  );
};

FolderFull.type = dexes.Folder;

FolderFull.topology = [
  fullResourceTopology,
];

export default register(FolderFull);
