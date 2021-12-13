import { makeStyles } from '@material-ui/styles';
import React from 'react';

import { CollectionHeaderFloatCID } from './HeaderFloat';

const useStyles = makeStyles({
  wrapper: {
    [`&:hover .${CollectionHeaderFloatCID}, &:focus-within .${CollectionHeaderFloatCID}`]: {
      opacity: 1,
    },
  },
});

export interface CollectionFrameWrapperProps {
  Wrapper: React.ElementType,
}

export const CollectionFrameWrapper = ({ Wrapper, children }: React.PropsWithChildren<CollectionFrameWrapperProps>): JSX.Element => {
  const classes = useStyles();

  return (
    <Wrapper>
      <div className={classes.wrapper}>
        {children}
      </div>
    </Wrapper>
  );
};
