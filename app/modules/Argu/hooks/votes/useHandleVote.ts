import { isNamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import { LaxIdentifier, useLRS } from 'link-redux';
import React from 'react';

import { handle } from '../../../../helpers/logging';
import {
  HTTP_RETRY_WITH,
  SubmitDataProcessor,
  handleHTTPRetry, 
} from '../../../Common/lib/errorHandling';

const useHandleVote = (action: LaxIdentifier, option: SomeNode, currentOption: LaxIdentifier): [handleClick: React.MouseEventHandler, loading: boolean] => {
  const lrs = useLRS<unknown, SubmitDataProcessor>();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(false);
  }, [currentOption]);

  const handleClick: React.MouseEventHandler = React.useCallback((e) => {
    e.preventDefault();

    if (!isNamedNode(action)) {
      return Promise.resolve();
    }

    setLoading(true);
    const dataObject = {
      [schema.option.value]: option,
    };

    return (
      lrs.exec(action, dataObject).catch((error) => {
        setLoading(false);

        if (error.response.status === HTTP_RETRY_WITH) {
          return handleHTTPRetry(lrs, error, () => handleClick(e));
        }

        return handle(error);
      })
    );
  }, [lrs, action, option]);

  return [handleClick, loading];
};

export default useHandleVote;
