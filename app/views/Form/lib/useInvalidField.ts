import * as sh from '@ontologies/shacl';
import { SomeNode } from 'link-lib';
import {
  LaxNode,
  useResourceLinks,
} from 'link-redux';
import { useFormState } from 'react-final-form';

const useInvalidField = (fields: SomeNode[]): LaxNode => {
  const formState = useFormState({
    subscription: {
      errors: true,
    },
  });
  const invalidFields = Object.keys(formState.errors);
  const invalidFieldPaths = useResourceLinks(
    fields,
    { path: sh.path },
  );
  const invalidFieldIndex = fields.findIndex((_, index) => {
    const path = invalidFieldPaths[index].path;

    return path && btoa(path?.value) === invalidFields[0];
  });

  return invalidFieldIndex ? fields[invalidFieldIndex] : undefined;
};

export default useInvalidField;
