import React, { useState } from 'react';
import {
  ReactTypeformEmbed,
  ReactTypeformEmbedProps,
  TypeFormWrapper,
} from 'react-typeform-embed';

import Button from '../../components/Button';

const Typeform = (props: ReactTypeformEmbedProps): JSX.Element => {
  const [ref, setRef] = useState<TypeFormWrapper | null>(null);

  return (
    <React.Fragment>
      <Button
        onClick={() => ref?.typeform?.open()}
      >
        Start!
      </Button>
      <ReactTypeformEmbed
        {...props}
        ref={(tf) => (setRef(tf))}
      />
    </React.Fragment>
  );
};

export default Typeform;
