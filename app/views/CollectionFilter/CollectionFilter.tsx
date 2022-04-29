import Chip from '@mui/material/Chip';
import rdfFactory, { SomeTerm } from '@ontologies/core';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  Property,
  Resource,
  register,
  useIds,
  useLRS,
  useProperty,
} from 'link-redux';
import React from 'react';

import { useCollectionOptions } from '../../components/Collection/CollectionContext';
import { isResource } from '../../helpers/types';
import { useIRITemplate } from '../../hooks/useIRITemplate';
import ontola from '../../ontology/ontola';
import { allTopologies, inlineTopology } from '../../topologies';

const Value = ({ prop }: { prop: SomeTerm }) => {
  const lrs = useLRS();

  if (isResource(prop)) {
    return (
      <Resource
        subject={prop}
        topology={inlineTopology}
      />
    );
  }

  const LiteralRenderer = lrs.getComponentForProperty(
    rdfs.Literal,
    rdfFactory.namedNode(prop.datatype.value),
    inlineTopology,
  );

  if (LiteralRenderer) {
    return (
      <LiteralRenderer
        linkedProp={prop}
        subject={prop.datatype}
      />
    );
  }

  return (
    <React.Fragment>
      {prop.value}
    </React.Fragment>
  );
};

const CollectionFilter = () => {
  const [filterKey] = useProperty(ontola.filterKey);
  const filterValues = useProperty(ontola.filterValue);
  const [partOf] = useIds(schema.isPartOf);

  const iriTemplate = useIRITemplate(partOf);
  const { setCollectionResource } = useCollectionOptions();

  return (
    <React.Fragment>
      {filterValues.map((filterValue) => {
        const label = (
          <React.Fragment>
            <Property label={ontola.filterKey} />
            {': '}
            <Value prop={filterValue} />
          </React.Fragment>
        );

        const handleDelete = () => {
          const url = iriTemplate.remove(
            'filter%5B%5D',
            `${encodeURIComponent(filterKey.value)}=${encodeURIComponent(filterValue.value)}`,
          );

          if (url) {
            setCollectionResource(url);
          }
        };

        return (
          <Chip
            key={filterValue.value}
            label={label}
            variant="outlined"
            onDelete={handleDelete}
          />
        );
      })}
    </React.Fragment>
  );
};

CollectionFilter.type = [
  ontola.Filter,
  ontola.CollectionFilter,
];

CollectionFilter.topology = allTopologies;

export default register(CollectionFilter);
