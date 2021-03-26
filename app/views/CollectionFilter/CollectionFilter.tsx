import Chip from '@material-ui/core/Chip';
import rdfFactory, { NamedNode, SomeTerm } from '@ontologies/core';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  Resource,
  ReturnType,
  register,
  useLRS,
} from 'link-redux';
import React from 'react';

import { useCollectionOptions } from '../../components/Collection/CollectionProvider';
import { isResource } from '../../helpers/types';
import { useIRITemplate } from '../../hooks/useIRITemplate';
import ontola from '../../ontology/ontola';
import { allTopologies } from '../../topologies';
import { inlineTopology } from '../../topologies/Inline';

const Value = ({ prop }: { prop: SomeTerm }) => {
  const lrs = useLRS();

  if (isResource(prop)) {
    return <Resource subject={prop} topology={inlineTopology} />;
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

  return <React.Fragment>{prop.value}</React.Fragment>;
};

interface CollectionFilterProps {
  filterKey: SomeTerm;
  filterValues: SomeTerm[];
  partOf: NamedNode;
}

const CollectionFilter: FC<CollectionFilterProps> = ({
  filterKey,
  filterValues,
  partOf,
}) => {
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

CollectionFilter.mapDataToProps = {
  filterKey: ontola.filterKey,
  filterValues: {
    label: ontola.filterValue,
    returnType: ReturnType.AllTerms,
  },
  partOf: schema.isPartOf,
};

export default register(CollectionFilter);
