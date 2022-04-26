import React, { EventHandler, SyntheticEvent } from 'react';
import { useHistory } from 'react-router';

import { clearFormStorage } from '../../helpers/forms';

export const useFormCancel = (formID?: string, onCancel?: EventHandler<SyntheticEvent<unknown>>): EventHandler<SyntheticEvent<unknown>> => {
  const history = useHistory();

  return React.useCallback((e) => {
    if (formID) {
      clearFormStorage(formID);
    }

    if (onCancel) {
      onCancel(e);
    } else {
      history.goBack();
    }
  }, [formID, onCancel]);
};
