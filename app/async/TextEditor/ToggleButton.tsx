import PropTypes from 'prop-types';
import React, { EventHandler } from 'react';
import { connect } from 'react-redux';

import Button, { ButtonTheme } from '../../components/Button';
import {
  showDraftEditor,
  showMarkdownEditor,
} from '../../state/textEditor/actions';
import { getEditorShowRich } from '../../state/textEditor/selectors';

interface PropTypes {
  onShowPlainEditor: EventHandler<any>;
  onShowRichEditor: EventHandler<any>;
  showRichEditor: boolean;
}

const ToggleEditor: React.FC<PropTypes> = ({
  onShowPlainEditor,
  onShowRichEditor,
  showRichEditor,
}) => {
  const onClick = () => {
    if (showRichEditor) {
      return onShowPlainEditor;
    }

    return onShowRichEditor;
  };

  const icon = () => {
    if (showRichEditor) {
      return 'check-square-o';
    }

    return 'square-o';
  };

  return (
    <Button
      small
      icon={icon()}
      theme={ButtonTheme.Transparant}
      title="Wanneer dit aangevinkt staat, kan je tekst selecteren
        om opmaak te wijzigen en links toe te voegen."
      onClick={onClick()}
    >
      Opmaak
    </Button>
  );
};

const mapStateToProps = (state: any) => ({
  showRichEditor: getEditorShowRich(state),
});

const mapDispatchToProps = (dispatch: any, props: any) => ({
  onShowPlainEditor: () => dispatch(showMarkdownEditor(props.id)),
  onShowRichEditor: () => dispatch(showDraftEditor(props.id)),
});

const ConnectedToggleButton = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ToggleEditor);

export default ConnectedToggleButton;
