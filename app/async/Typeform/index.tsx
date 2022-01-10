import { makePopup } from '@typeform/embed';
import React from 'react';

import { TypeformProps } from '../../containers/Typeform';

const Typeform = ({
  url,
  ...popupOpts
}: TypeformProps): JSX.Element => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      const popup = makePopup(
        url,
        {
          container: ref.current,
          ...popupOpts,
        },
      );
      popup.open();
    }
  }, [ref.current, url]);

  return <div ref={ref} />;
};

export default Typeform;
