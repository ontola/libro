import as from '@ontologies/as';
import rdfx from '@ontologies/rdf';
import {
  useDataInvalidation,
  useLRS,
} from 'link-redux';

import { entityHasError, entityIsLoaded } from '../helpers/data';
import { collectionMembers } from '../helpers/diggers';

const useTargetValues = (targetIRI, path) => {
  const lrs = useLRS();
  const rawTargetValues = lrs.getResourceProperties(targetIRI, path);

  useDataInvalidation({
    dataSubjects: rawTargetValues.filter((s) => ['NamedNode', 'TermType'].includes(s.termType)),
    subject: targetIRI,
  });

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
