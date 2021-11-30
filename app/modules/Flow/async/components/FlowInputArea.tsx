import { makeStyles } from '@material-ui/styles';
import { SomeNode } from 'link-lib';
import { Resource } from 'link-redux';
import React from 'react';

import { LibroTheme } from '../../../../themes/themes';

import { FlowAnimation } from './FlowAnimation';
import { SubmissionPage } from './SubmissionPage';

export interface FlowInputAreaProps {
  currentIndex: number;
  canForwardByEnter: boolean;
  fields: SomeNode[];
  onNext: () => void;
  isPhone: boolean;
  onSubmitBack: (key: string) => void;
}

const useStyles = makeStyles<LibroTheme>((theme) => ({
  centeredInputs: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
  },
  inputWrapper: {
    [theme.breakpoints.down('sm')]: {
      padding: '1rem',
    },
    maxHeight: '95vh',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    position: 'absolute',
  },
}));

export const FlowInputArea = ({
  canForwardByEnter,
  currentIndex,
  fields,
  onNext,
  isPhone,
  onSubmitBack,
}: FlowInputAreaProps): JSX.Element => {
  const classes = useStyles();

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = React.useCallback((e) => {
    if (canForwardByEnter && e.key === 'Enter') {
      e.preventDefault();
      onNext();
    }
  }, [onNext, canForwardByEnter]);

  return (
    <div className={classes.centeredInputs}>
      {fields.map((page, index) => (
        <FlowAnimation
          componentIndex={index}
          currentIndex={currentIndex}
          isPhone={isPhone}
          key={page.value}
        >
          <div
            className={classes.inputWrapper}
            onKeyDown={handleKeyDown}
          >
            <Resource subject={page} />
          </div>
        </FlowAnimation>
      ))}
      <FlowAnimation
        componentIndex={fields.length}
        currentIndex={currentIndex}
        isPhone={isPhone}
      >
        <span>
          <SubmissionPage
            onBack={onSubmitBack}
          />
        </span>
      </FlowAnimation>
    </div>
  );
};
