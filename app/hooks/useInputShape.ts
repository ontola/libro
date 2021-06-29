import { NamedNode } from '@ontologies/core';
import * as sh from '@ontologies/shacl';
import { LaxNode, useLRS } from 'link-redux';
import React from 'react';

import { FormContext } from '../components/Form/Form';
import { formFieldsPath } from '../helpers/diggers';

const useInputShape = (path: NamedNode): LaxNode => {
  const lrs = useLRS();
  const { formIRI } = React.useContext(FormContext);

  if (!formIRI) {
    return undefined;
  }

  return lrs.findSubject(
    formIRI,
    [...formFieldsPath, sh.path],
    path,
  ).pop();
};

export default useInputShape;
