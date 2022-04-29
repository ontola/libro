import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import {
  FormattedMessage,
  useIntl,
} from 'react-intl';

import { parseBoolean } from '../../helpers/persistence';
import useStoredState from '../../hooks/useStoredState';
import { LibroTheme } from '../../themes/themes';
import { collapseTextToggleCID } from '../../topologies/Card/sharedCardStyles';
import { collapsibleMessages } from '../../translations/messages';
import Button, { ButtonLabelIdentifierClass } from '../Button';
import Collapsible from '../Collapsible';
import Markdown from '../Markdown';

const useStyles = makeStyles<LibroTheme>((theme) => ({
  collapseText: {
    [`& .${collapseTextToggleCID}`]: {
      '&:hover': {
        [`& .${ButtonLabelIdentifierClass}`]: {
          color: theme.palette.grey.midDark,
        },
      },
      background: `linear-gradient(to bottom, ${theme.palette.transparent.main} 0%, ${theme.palette.background.paper} 30%, ${theme.palette.background.paper} 100%)`,
      bottom: '1em',
      lineHeight: '3em',
      position: 'relative',
      textAlign: 'right',
      width: '100%',
    },
    [`& .${ButtonLabelIdentifierClass}`]: {
      color: theme.palette.grey.xxLightForegroundSmall,
      margin: 0,
      padding: '.3em 1.2em',
      position: 'relative',
      right: 0,
      transition: '.2s transform',
    },
    marginBottom: '-.5em',
  },
  collapseTextOpen: {
    [`& .${collapseTextToggleCID}`]: {
      '& .fa': {
        transform: 'rotate(180deg)',
      },
    },
  },
}));

interface CollapseTextProps {
  id: string;
  minCharacters: number;
  noSpacing?: boolean;
  open?: boolean;
  text: string;
}

const CollapseText: React.FC<CollapseTextProps> = ({
  id,
  minCharacters,
  noSpacing,
  text,
}) => {
  const storeKey = `${id}-collapsible`;
  const [open, setOpen] = useStoredState(storeKey, false, localStorage, parseBoolean);
  const toggleCollapsible = React.useCallback(
    () => setOpen(!open),
    [setOpen, open],
  );
  const intl = useIntl();

  const classes = useStyles();
  const className = clsx({
    [classes.collapseText]: true,
    [classes.collapseTextOpen]: open,
  });

  if (text.length > minCharacters) {
    return (
      <div className={className}>
        <Collapsible
          preview
          opened={open}
          onClickToggle={toggleCollapsible}
        >
          <Markdown
            noSpacing={noSpacing}
            tabbable={open}
            text={text}
          />
        </Collapsible>
        <Button
          plain
          className={collapseTextToggleCID}
          title={intl.formatMessage(collapsibleMessages.expandOrCollapseTitle)}
          onClick={toggleCollapsible}
        >
          {open && (
            <FormattedMessage
              defaultMessage="Collapse"
              id="https://app.argu.co/i18n/collapsible/collapse"
            />
          )}
          {!open && (
            <FormattedMessage
              defaultMessage="Read more"
              id="https://app.argu.co/i18n/collapsible/expand"
            />
          )}
          {' '}
          <FontAwesome name="caret-down" />
        </Button>
      </div>
    );
  }

  return (
    <Markdown
      noSpacing={noSpacing}
      text={text}
    />
  );
};

CollapseText.defaultProps = {
  minCharacters: 700,
};

export default CollapseText;
