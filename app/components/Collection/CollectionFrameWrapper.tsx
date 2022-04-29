import { makeStyles } from '@mui/styles';
import React from 'react';

import HeadingContext from '../Heading/HeadingContext';

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
      <HeadingContext>
        <div className={classes.wrapper}>
          {children}
        </div>
      </HeadingContext>
    </Wrapper>
  );
};
