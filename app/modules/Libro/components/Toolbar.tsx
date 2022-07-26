import rdf, { NamedNode } from '@ontologies/core';
import {
  Container,
  InputBase,
  Toolbar as MuiToolbar,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { ChangeEvent } from 'react';
import ArrowForward from '@mui/icons-material/ArrowForward';
import { useDebounce } from 'use-debounce';

import { LibroTheme } from '../../Kernel/lib/themes';

const DEBOUNCE_TIMEOUT = 500;

const useStyles = makeStyles<LibroTheme>((theme) => ({
  inputInput: {
    padding: theme.spacing(1, 1, 1, 1),
    transition: theme.transitions.create('width'),
    width: '100%',
  },
  inputRoot: {
    flexGrow: 1,
    height: '100%',
  },
  toolbar: {
    borderRadius: theme.shape.borderRadius,
    color: 'inherit',
    display: 'flex',
    flexGrow: 1,
    marginLeft: 0,
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
    width: '100%',
  },
  toolbarIcon: {
    height: '100%',
    margin: '0 0 0 .5em',
  },
  toolbarWrapper: {
    display: 'flex',
    flexGrow: 1,
    position: 'relative',
  },
}));

export interface ToolbarProps {
  initial: string;
  setId: (id: NamedNode) => void;
}

export const Toolbar = ({ initial, setId }: ToolbarProps): JSX.Element => {
  const classes = useStyles();

  const [input, setInput] = React.useState(initial);
  const [lastValid, setLastValid] = React.useState(rdf.namedNode(input));
  const [current] = useDebounce(lastValid, DEBOUNCE_TIMEOUT);

  const updateIfValid = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const next = e.target?.value ?? '';
    setInput(next);

    try {
      new URL(next);
      setLastValid(rdf.namedNode(next));
    } catch (err) {
      /* nop */
    }
  }, []);

  React.useEffect(() => {
    setId(current);
  }, [current]);

  return (
    <MuiToolbar>
      <Container maxWidth="xl">
        <div className={classes.toolbarWrapper}>
          <div className={classes.toolbar}>
            <InputBase
              classes={{
                input: classes.inputInput,
                root: classes.inputRoot,
              }}
              placeholder="Enter an id…"
              type="search"
              value={input}
              onChange={updateIfValid}
            />
            <ArrowForward className={classes.toolbarIcon} />
          </div>
        </div>
      </Container>
    </MuiToolbar>
  );
};
