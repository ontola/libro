import React from 'react';
import { FormattedMessage } from 'react-intl';

import './NetworkStatusIndicator.scss';

const NetworkStatusIndicator = () => {
  const [onLine, setOnLine] = React.useState(__CLIENT__ ? navigator.onLine : true);

  if (__CLIENT__) {
    React.useEffect(() => {
      const onLineListener = () => setOnLine(true);
      const offLineListener = () => setOnLine(false);
      window.addEventListener('online', onLineListener);
      window.addEventListener('offline', offLineListener);

      return () => {
        window.removeEventListener('online', onLineListener);
        window.removeEventListener('offline', offLineListener);
      };
    });
  }

  if (onLine) {
    return null;
  }

  return (
    <div className="NetworkStatusIndicator">
      <FormattedMessage
        defaultMessage="Network connection lost"
        description="Message shown to the user when the navigator lost its network connection"
        id="https://app.argu.co/i18n/errors/client/offline/header"
      />
    </div>
  );
};

export default NetworkStatusIndicator;
