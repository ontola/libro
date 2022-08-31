import { NamedNode } from '@ontologies/core';
import * as sh from '@ontologies/shacl';
import { LaxNode, useFindSubject } from 'link-redux';

import { formFieldsPath } from '../lib/diggers';

const useInputId = (formIRI: LaxNode, path: NamedNode): LaxNode => {
  const [match] = useFindSubject([...formFieldsPath, sh.path], path, formIRI);

  return match;
};

export default useInputId;
