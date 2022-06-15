import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import React, { FC } from 'react';
import Textarea from 'react-autosize-textarea';
import { FormattedMessage } from 'react-intl';

import { LibroTheme } from '../../../../themes/themes';
import { formMessages } from '../../../../translations/messages';
import Button, { ButtonVariant } from '../../../Common/components/Button';
import CardDivider from '../../../Common/components/Card/CardDivider';
import Markdown from '../../../Common/components/Markdown';
import { formContext } from '../../components/Form/FormContext';
import { fieldInputCID, useFormStyles } from '../../components/FormField/UseFormStyles';
import { PlainEditorProps } from '../../components/TextEditor';

import MarkdownInstructions from './MarkdownInstructions';

const defaultProps = {
  autoFocus: false,
};

const useStyles = makeStyles<LibroTheme>((theme) => ({
  buttonWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
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
  required,
  rows,
  value,
}) => {
  const classes = useStyles();
  const formClasses = useFormStyles();
  const [showPreview, setShowPreview] = React.useState(false);
  const { onKeyUp } = React.useContext(formContext);

  return (
    <div>
      <div className={classes.wrapper}>
        <Textarea
          autoFocus={autoFocus}
          className={clsx(fieldInputCID, formClasses.fieldInput)}
          id={id}
          maxLength={maxLength}
          minLength={minLength}
          placeholder={placeholder}
          required={required}
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
            variant={ButtonVariant.Transparent}
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
