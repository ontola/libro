import { isNode } from '@ontologies/core';
import {
  LaxNode,
  useDataInvalidation,
  useLRS,
} from 'link-redux';
import React from 'react';

import { SubmissionErrors } from '../../components/FormField';

type ClearErrors = () => void;

const useSubmissionErrors = (errorResponse: LaxNode): [SubmissionErrors, ClearErrors] => {
  const lrs = useLRS();
  const [activeErrors, setActiveErrors] = React.useState<SubmissionErrors>({});
  const errorResponseTimestamp = useDataInvalidation(isNode(errorResponse) ? errorResponse : undefined);
  const submissionErrors = React.useMemo<SubmissionErrors>(() => {
    if (isNode(errorResponse)) {
      const errs = lrs.tryEntity(errorResponse).reduce((acc: SubmissionErrors, triple) => {
        const key = btoa(triple.predicate.value);

        return {
          ...acc,
          [key]: (acc[key] || []).concat([{
            error: triple.object.value,
            index: 0,
          }]),
        };
      }, {});

      return errs;
    }

    return {};
  }, [errorResponse, errorResponseTimestamp]);
  React.useEffect(() => {
    setActiveErrors(submissionErrors);
  }, [submissionErrors]);
  const clearErrors = React.useCallback(() => {
    setActiveErrors({});
  }, [setActiveErrors]);

  return [activeErrors, clearErrors];
};

export default useSubmissionErrors;
