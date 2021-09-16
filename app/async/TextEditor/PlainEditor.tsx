import { makeStyles } from '@material-ui/styles';
import React, {
  EventHandler,
  FC,
} from 'react';
import Textarea from 'react-autosize-textarea';
import { FormattedMessage } from 'react-intl';

import Button, { ButtonTheme } from '../../components/Button';
import CardDivider from '../../components/Card/CardDivider';
import { FormContext } from '../../components/Form/Form';
import Markdown from '../../components/Markdown';
import { LibroTheme } from '../../themes/themes';
import { formMessages } from '../../translations/messages';

import MarkdownInstructions from './MarkdownInstructions';

const defaultProps = {
  autoFocus: false,
};

export interface PlainEditorProps {
  autoFocus?: boolean;
  id: string;
  maxLength?: number;
  minLength?: number;
  onBlur: EventHandler<any>;
  onChange?: EventHandler<any>;
  onFocus: EventHandler<any>;
  placeholder?: string;
  rows?: number;
  value: string;
}

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
            theme={ButtonTheme.Transparant}
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
