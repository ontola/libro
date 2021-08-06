import clsx from 'clsx';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import {
  FormattedMessage,
  useIntl,
} from 'react-intl';

import { parseBoolean } from '../../helpers/persistence';
import useStoredState from '../../hooks/useStoredState';
import { collapsibleMessages } from '../../translations/messages';
import Button from '../Button';
import Collapsible from '../Collapsible';
import Markdown from '../Markdown';

import './CollapseText.scss';

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

  const classes = clsx({
    'CollapseText': true,
    'CollapseText--open': open,
  });

  if (text.length > minCharacters) {
    return (
      <div className={classes}>
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
          className="CollapseText__toggle"
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
