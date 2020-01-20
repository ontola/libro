import React, { useState } from 'react';
import { ReactTypeformEmbed } from 'react-typeform-embed';

import Button from '../../components/Button';

const Typeform = (props) => {
  const [ref, setRef] = useState(null);

  return (
    <React.Fragment>
      <Button
        onClick={() => ref.typeform.open()}
      >
        Start!
      </Button>
      <ReactTypeformEmbed
        ref={(tf) => (setRef(tf))}
        {...props}
      />
    </React.Fragment>
  );
};

export default Typeform;
