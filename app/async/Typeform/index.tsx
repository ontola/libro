import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import {
  ReactTypeformEmbed,
  ReactTypeformEmbedProps,
  TypeFormWrapper,
} from 'react-typeform-embed';

import Button from '../../components/Button';
import { surveyMessages } from '../../translations/messages';

const Typeform = (props: ReactTypeformEmbedProps): JSX.Element => {
  const intl = useIntl();
  const [ref, setRef] = useState<TypeFormWrapper | null>(null);
  React.useEffect(() => () => ref?.typeform?.close());

  return (
    <React.Fragment>
      <Button
        onClick={() => ref?.typeform?.open()}
      >
        {intl.formatMessage(surveyMessages.startButtonText)}
      </Button>
      <ReactTypeformEmbed
        {...props}
        ref={(tf) => (setRef(tf))}
      />
    </React.Fragment>
  );
};

export default Typeform;
