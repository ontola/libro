import { NamedNode } from '@ontologies/core';
import * as sh from '@ontologies/shacl';
import { LaxNode, useFindSubject } from 'link-redux';
import React from 'react';

import { FormContext } from '../components/Form/Form';
import { formFieldsPath } from '../helpers/diggers';

const useInputShape = (path: NamedNode): LaxNode => {
  const { formIRI } = React.useContext(FormContext);

  return useFindSubject([...formFieldsPath, sh.path], path, formIRI).pop();
};

export default useInputShape;
