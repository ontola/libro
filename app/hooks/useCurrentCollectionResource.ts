import { NamedNode } from '@ontologies/core';
import {
  useLRS,
  useResourceProperty,
} from 'link-redux';
import { useHistory } from 'react-router';

import { retrievePath } from '../helpers/iris';
import app from '../ontology/app';

export const useCurrentCollectionResource = (redirectPagination: boolean, originalCollectionResource: NamedNode) => {
  const lrs = useLRS();
  const history = useHistory();
  const [collectionResource] = useResourceProperty(originalCollectionResource, app.collectionResource);

  if (redirectPagination) {
    const redirectPage = (newPage: NamedNode) => (
      history.push(retrievePath(newPage?.value))
    );

    return [originalCollectionResource, redirectPage];
  } else {
    const setCurrentPage = (newPage: NamedNode) => lrs.actions.app.changePage(originalCollectionResource, newPage);

    return [collectionResource, setCurrentPage];
  }
};
