import { toEmpJson } from '../../../helpers/empjsonSerializer';

import parseToGraph from './parseToGraph';

export const sourceToSlice = (source: string, websiteIRI: string): string => {
  const quads = parseToGraph(source, websiteIRI, false)
    .flatMap(([_, store]) => store.quads);

  return JSON.stringify(toEmpJson(quads));
};
