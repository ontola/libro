import * as rdfx from '@ontologies/rdf';
import { SomeNode } from 'link-lib';
import {
  array,
  literal,
  useIds,
  useResourceLinks,
} from 'link-redux';

import { tryParseInt } from '../../helpers/numbers';
import opengov from '../../ontology/opengov';

const countsPropMap = {
  option: rdfx.type,
  value: literal(rdfx.value),
};

const useCounts = (options: SomeNode[]): number[] => {
  const counts = useIds(array(opengov.count));
  const countProps = useResourceLinks(counts, countsPropMap);

  return options.map((option) => (
    tryParseInt(countProps.find((props) => props.option === option)?.value) || 0
  ));
};

export default useCounts;
