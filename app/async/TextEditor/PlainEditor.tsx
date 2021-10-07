import { makeStyles } from '@material-ui/styles';
import React, { FC } from 'react';
import Textarea from 'react-autosize-textarea';
import { FormattedMessage } from 'react-intl';

import Button, { ButtonTheme } from '../../components/Button';
import CardDivider from '../../components/Card/CardDivider';
import { FormContext } from '../../components/Form/Form';
import Markdown from '../../components/Markdown';
import { PlainEditorProps } from '../../containers/TextEditor';
import { LibroTheme } from '../../themes/themes';
import { formMessages } from '../../translations/messages';

import MarkdownInstructions from './MarkdownInstructions';

const defaultProps = {
  autoFocus: false,
};

const useStyles = makeStyles<LibroTheme>((theme) => ({
  buttonWrapper: {
    display: 'flex',
  },
  preview: {
    padding: '10px 20px',
  },
  wrapper: {
    '& textarea': {
      fontFamily: theme.typography.fontFamily,
      overflow: 'hidden',
    },
    display: 'flex',
    flexDirection: 'column',
  },
}));

const PlainEditor: FC<PlainEditorProps> = ({
  autoFocus,
  id,
  maxLength,
  minLength,
  onChange,
  onBlur,
  onFocus,
  placeholder,
  rows,
  value,
}) => {
  const classes = useStyles();
  const [showPreview, setShowPreview] = React.useState(false);
  const { onKeyUp } = React.useContext(FormContext);

  return (
    <div>
      <div className={classes.wrapper}>
        <Textarea
          autoFocus={autoFocus}
          className="Field__input"
          id={id}
          maxLength={maxLength}
          minLength={minLength}
          placeholder={placeholder}
          rows={rows}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
          onKeyUp={onKeyUp}
        />
        <div className={classes.buttonWrapper}>
          <Button
            small
            icon={showPreview ? 'caret-down' : 'caret-right'}
            theme={ButtonTheme.Transparent}
            onClick={() => setShowPreview(!showPreview)}
          >
            <FormattedMessage {...formMessages.markdownPreview} />
          </Button>
          <MarkdownInstructions />
        </div>
      </div>
      {showPreview && (
        <div>
          <CardDivider />
          <div className={classes.preview}>
            <Markdown text={value} />
          </div>
          <CardDivider />
        </div>
      )}
    </div>
  );
};

PlainEditor.defaultProps = defaultProps;

export default PlainEditor;
