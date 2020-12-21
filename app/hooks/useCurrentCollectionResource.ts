import { NamedNode } from '@ontologies/core';
import {
  useLRS,
  useResourceProperty,
} from 'link-redux';
import { useHistory } from 'react-router';

import { retrievePath } from '../helpers/iris';
import app from '../ontology/app';

type CurrentCollectionResource = [NamedNode, (newPage: NamedNode) => void];

export const useCurrentCollectionResource = (redirectPagination: boolean, originalCollectionResource: NamedNode):
  CurrentCollectionResource => {
  const lrs = useLRS();
  const history = useHistory();
  const [collectionResource] = useResourceProperty(originalCollectionResource, app.collectionResource) as NamedNode[];

  if (redirectPagination) {
    const redirectPage = (newPage: NamedNode) => (
      history.push(retrievePath(newPage?.value) ?? '#')
    );

    return [originalCollectionResource, redirectPage];
  }
    const setCurrentPage = (newPage: NamedNode) => {
      lrs.actions.app.changePage(originalCollectionResource, newPage);
    };

    return [collectionResource, setCurrentPage];

};
