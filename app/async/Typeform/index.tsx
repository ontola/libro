import { makePopup } from '@typeform/embed';
import React from 'react';

import { TypeformProps } from '../../containers/Typeform';

const Typeform = ({
  url,
  ...popupOpts
}: TypeformProps): null => {
  React.useEffect(() => {
    const popup = makePopup(
      url,
      popupOpts,
    );
    popup.open();

    return () => popup.close();
  }, [url]);

  return null;
};

export default Typeform;
