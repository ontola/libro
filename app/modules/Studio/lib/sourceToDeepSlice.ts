import { DeepSlice, dataObjectsToDeepSlice } from './dataObjectsToDeepSlice';
import { evaluate } from './evaluate';

export const sourceToDeepSlice = (source: string, websiteIRI: string): DeepSlice => {
  const dataObjects = evaluate(source, websiteIRI);

  return dataObjectsToDeepSlice(dataObjects);
};
