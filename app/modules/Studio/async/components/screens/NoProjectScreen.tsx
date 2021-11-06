import { Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import React, { Dispatch } from 'react';

import {
  Action,
  ProjectAction,
} from '../../context/ProjectContext';
import { DocumentList } from '../DocumentList';

interface NoProjectScreenProps {
  dispatch: Dispatch<Action>,
}

export const NoProjectScreen = ({ dispatch }: NoProjectScreenProps): JSX.Element => {
  const handleSelect = React.useCallback((doc: string) => {
    dispatch({
      iri: doc,
      type: ProjectAction.Load,
    });
  }, []);

  return (
    <Container>
      <Typography variant="h1">
        Welcome to studio
      </Typography>
      <DocumentList
        onSelect={handleSelect}
      />
    </Container>
  );
};
