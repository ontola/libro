import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  getEditorShowRich,
} from '../../state/textEditor/selectors';
import {
  showDraftEditor,
  showMarkdownEditor,
} from '../../state/textEditor/actions';
import { Button } from '../../components';

const propTypes = {
  onShowPlainEditor: PropTypes.func.isRequired,
  onShowRichEditor: PropTypes.func.isRequired,
  showRichEditor: PropTypes.bool.isRequired,
};

const ToggleEditor = ({
  onShowPlainEditor,
  onShowRichEditor,
  showRichEditor,
}) => {
  const onClick = () => {
    if (showRichEditor) return onShowPlainEditor;
    return onShowRichEditor;
  };

  const icon = () => {
    if (showRichEditor) return 'check-square-o';
    return 'square-o';
  };

  return (
    <Button
      small
      className="Button--inside-textarea"
      icon={icon()}
      theme="transparant"
      title="Wanneer dit aangevinkt staat, kan je tekst selecteren om opmaak te wijzigen en links toe te voegen."
      onClick={onClick()}
    >Opmaak
    </Button>
  );
};

ToggleEditor.propTypes = propTypes;

const mapStateToProps = state => ({
  showRichEditor: getEditorShowRich(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  onShowPlainEditor: () => dispatch(showMarkdownEditor(props.id)),
  onShowRichEditor: () => dispatch(showDraftEditor(props.id)),
});

const ConnectedToggleButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(ToggleEditor);

export default ConnectedToggleButton;
