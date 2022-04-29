import makeStyles from '@mui/styles/makeStyles';
import { makePopup } from '@typeform/embed';
import React from 'react';

import { TypeformProps } from '../../containers/Typeform';

const useStyles = makeStyles(() => ({
  wrapper: {
    bottom: 0,
    left: 0,
    position: 'fixed',
    right: 0,
    top: 0,
  },
}));

const Typeform = ({
  url,
  ...popupOpts
}: TypeformProps): JSX.Element => {
  const classes = useStyles();
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

  return (
    <div className={classes.wrapper}>
      <div ref={ref} />
    </div>
  );
};

export default Typeform;
