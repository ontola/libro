import React from 'react';

export enum MONETIZATION_STATE {
  'PENDING',
  'EXTENSION_MISSING',
  'STOPPED_PAYING',
  'PAYING',
}

export const useMonetization = (): MONETIZATION_STATE => {
  const [isPaying, setisPaying] = React.useState(MONETIZATION_STATE.PENDING);

  React.useEffect(() => {
    if (!(document as any).monetization) {
      // This means this user doesn't have monetization capabilities
      // i.e. they don't have the Coil extension installed on their browser
      setisPaying(MONETIZATION_STATE.EXTENSION_MISSING);

      return;
    }

    // Note: A user could have monetization capabilities (i.e. installed Coil)
    // but that doesn't mean they've actually signed up for an account!
    const { state } = (document as any).monetization;

    // If the initial state is 'stopped', we can assume the user isn't
    // going to pay, and so we can stop loading
    if (state === 'stopped') {
      setisPaying(MONETIZATION_STATE.STOPPED_PAYING);
    }

    // We add a listener to wait for the user to start paying
    (document as any).monetization.addEventListener('monetizationstart', () => {
      setisPaying(MONETIZATION_STATE.PAYING);
    });
  }, []);

  return isPaying;
};

export default useMonetization;
