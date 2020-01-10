import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import {
  FormattedMessage,
  defineMessages,
  useIntl,
} from 'react-intl';
import { connect } from 'react-redux';

import Button from '../Button';
import Markdown from '../Markdown';
import CollapsibleContainer from '../../containers/CollapsibleContainer';
import { initializeCollapsible, toggleOne } from '../../state/collapsible/actions';
import { getCollapsibleOpened } from '../../state/collapsible/selectors';

import './CollapseText.scss';

const messages = defineMessages({
  expandOrCollapseTitle: {
    defaultMessage: 'Expand or collapse menu',
    id: 'https://app.argu.co/i18n/collapsible/expandOrCollapseMenu',
  },
});

const propTypes = {
  id: PropTypes.string.isRequired,
  minCharacters: PropTypes.number,
  noSpacing: PropTypes.bool,
  onClickToggle: PropTypes.func.isRequired,
  open: PropTypes.bool,
  text: PropTypes.string,
};

const defaultProps = {
  minCharacters: 700,
};

const CollapseText = ({
  id,
  onClickToggle,
  minCharacters,
  noSpacing,
  open,
  text,
}) => {
  const intl = useIntl();

  const classes = classNames({
    CollapseText: true,
    'CollapseText--open': open,
  });

  if (text.length > minCharacters) {
    return (
      <div className={classes}>
        <CollapsibleContainer
          alwaysMountChildren
          preview
          id={id}
        >
          <Markdown noSpacing={noSpacing} tabbable={open} text={text} />
        </CollapsibleContainer>
        <Button
          plain
          className="CollapseText__toggle"
          title={intl.formatMessage(messages.expandOrCollapseTitle)}
          onClick={() => onClickToggle()}
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

  return <Markdown noSpacing={noSpacing} text={text} />;
};

CollapseText.propTypes = propTypes;

export default connect(
  (state, ownProps) => {
    const minCharacters = ownProps.minCharacters || defaultProps.minCharacters;

    return ({
      minCharacters,
      open: ownProps.text.length > minCharacters && getCollapsibleOpened(state, ownProps.id),
    });
  },
  (dispatch, { id }) => ({
    onClickToggle: () => dispatch(toggleOne(id)),
    onInitializeCollapsible: (data) => dispatch(initializeCollapsible(data)),
  })
)(CollapseText);
