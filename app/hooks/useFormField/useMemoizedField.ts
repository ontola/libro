import React from 'react';
import {
  FieldInputProps,
  FieldMetaState,
  UseFieldConfig,
  useField,
} from 'react-final-form';

import { diffError } from '../../helpers/validators';

interface MemoizedField<T> {
  input: FieldInputProps<T, HTMLElement>;
  meta: FieldMetaState<T>;
}

export const useMemoizedField = <T>(name: string, config?: UseFieldConfig<T> | undefined): MemoizedField<T> => {
  const { input, meta } = useField(name, config);

  const memoizedMeta = React.useMemo(
    () => meta,
    [meta.touched, diffError(meta.error), meta.pristine, meta.dirtySinceLastSubmit, meta.active],
  );

  return {
    input,
    meta: memoizedMeta,
  };
};
