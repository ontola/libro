import React, { EventHandler, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router';

import { clearFormStorage } from '../../../Form/lib/helpers';

export const useFormCancel = (formID?: string, onCancel?: EventHandler<SyntheticEvent<unknown>>): EventHandler<SyntheticEvent<unknown>> => {
  const navigate = useNavigate();

  return React.useCallback((e) => {
    if (formID) {
      clearFormStorage(formID);
    }

    if (onCancel) {
      onCancel(e);
    } else {
      navigate(-1);
    }
  }, [formID, onCancel]);
};
