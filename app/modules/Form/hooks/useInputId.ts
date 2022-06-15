import { NamedNode } from '@ontologies/core';
import * as sh from '@ontologies/shacl';
import { LaxNode, useFindSubject } from 'link-redux';
import React from 'react';

import { formContext } from '../components/Form/FormContext';
import { formFieldsPath } from '../lib/diggers';

const useInputId = (path: NamedNode): LaxNode => {
  const { formIRI } = React.useContext(formContext);
  const [match] = useFindSubject([...formFieldsPath, sh.path], path, formIRI);

  return match;
};

export default useInputId;
