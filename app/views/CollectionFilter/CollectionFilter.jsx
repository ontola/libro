import Chip from '@material-ui/core/Chip';
import rdfFactory from '@ontologies/core';
import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import {
  Property,
  Resource,
  ReturnType,
  register,
  useLRS,
} from 'link-redux';
import React from 'react';

import { isResource } from '../../helpers/types';
import { useIRITemplate } from '../../hooks/useIRITemplate';
import ontola from '../../ontology/ontola';
import { allTopologies } from '../../topologies';
import { inlineTopology } from '../../topologies/Inline';

const Value = ({ prop }) => {
  const lrs = useLRS();

  if (isResource(prop)) {
    return <Resource subject={prop} topology={inlineTopology} />;
  }

  const LiteralRenderer = lrs.getComponentForProperty(
    rdfs.Literal,
    rdfFactory.namedNode(prop.datatype.value),
    inlineTopology
  );

  if (LiteralRenderer) {
    return (
      <LiteralRenderer
        linkedProp={prop}
        subject={prop.datatype}
      />
    );
  }

  return prop.value;
};

const CollectionFilter = ({
  filterKey,
  filterValues,
  partOf,
  setCurrentPage,
}) => {
  const { iriRemoveParam } = useIRITemplate(partOf);

  return (
    filterValues.map((filterValue) => {
      const label = (
        <React.Fragment>
          <Property label={ontola.filterKey} />
          {': '}
          <Value prop={filterValue} />
        </React.Fragment>
      );

      const handleDelete = () => {
        const url = iriRemoveParam(
          'filter%5B%5D',
          `${encodeURIComponent(filterKey.value)}=${encodeURIComponent(filterValue.value)}`
        );

        setCurrentPage(url);
      };

      return (
        <Chip
          key={filterValue}
          label={label}
          variant="outlined"
          onDelete={handleDelete}
        />
      );
    })
  );
};

CollectionFilter.type = ontola.CollectionFilter;

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
