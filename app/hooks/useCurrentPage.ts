import { NamedNode } from '@ontologies/core';
import {
  useLinkRenderContext,
  useLRS,
  useProperty,
} from 'link-redux';
import { useHistory } from 'react-router';

import { retrievePath } from '../helpers/iris';
import app from '../ontology/app';

export const useCurrentPage = (redirectPagination: boolean, renderedPage: NamedNode) => {
  const lrs = useLRS();
  const history = useHistory();
  const { subject } = useLinkRenderContext();
  const [currentPage] = useProperty(app.currentPage);

  if (redirectPagination) {
    const redirectPage = (newPage: NamedNode) => (
      history.push(retrievePath(newPage?.value))
    );

    return [renderedPage, redirectPage];
  } else {
    const setCurrentPage = (newPage: NamedNode) => lrs.actions.app.changePage(subject, newPage);

    return [currentPage, setCurrentPage];
  }
};
