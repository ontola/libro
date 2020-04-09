import as from '@ontologies/as';
import rdfx from '@ontologies/rdf';
import {
  useDataInvalidation,
  useLRS,
  useResourceProperty,
} from 'link-redux';

import { entityHasError, entityIsLoaded } from '../helpers/data';
import { collectionMembers } from '../helpers/diggers';
import { isResource } from '../helpers/types';

const useTargetValues = (targetIRI, path) => {
  const lrs = useLRS();
  const rawTargetValues = useResourceProperty(targetIRI, path);

  useDataInvalidation([...rawTargetValues.filter(isResource), targetIRI]);

  const isCollection = rawTargetValues?.length === 1
    && lrs.findSubject(rawTargetValues[0], [rdfx.type], as.Collection).length > 0;

  if (!isCollection
    && rawTargetValues?.length === 1
    && rawTargetValues[0].termType === 'NamedNode'
    && !entityIsLoaded(lrs, rawTargetValues[0])) {
    if (__CLIENT__) {
      lrs.queueEntity(rawTargetValues[0], { reload: entityHasError(lrs, rawTargetValues[0]) });

      return Promise.resolve();
    }
  } else if (isCollection) {
    return lrs.dig(rawTargetValues[0], collectionMembers);
  }

  return rawTargetValues;
};

export default useTargetValues;
