import { makeStyles } from '@material-ui/styles';
import { mergeAndCompare } from 'merge-anything';
import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';

import { RichTextEditorWrapperProps } from '../../containers/RichTextEditor';
import { concatStrings } from '../../helpers/merge';

import RichTextEditorMd from './components/RichTextEditorMd';
import {
  DefaultCommandPluginsOptions,
  defaultPluginsOptions,
  getDefaultPlugins,
} from './plugins';

const messages = {
  boldButton: {
    id: 'https://app.argu.co/i18n/forms/editor/boldButton',
  },
  codeBlockButton: {
    id: 'https://app.argu.co/i18n/forms/editor/codeBlockButton',
  },
  heading1Button: {
    id: 'https://app.argu.co/i18n/forms/editor/heading1Button',
  },
  heading2Button: {
    id: 'https://app.argu.co/i18n/forms/editor/heading2Button',
  },
  heading3Button: {
    id: 'https://app.argu.co/i18n/forms/editor/heading3Button',
  },
  imageButton: {
    id: 'https://app.argu.co/i18n/forms/editor/imageButton',
  },
  imageDialogText: {
    id: 'https://app.argu.co/i18n/forms/editor/imageDialogText',
  },
  imageDialogTitle: {
    id: 'https://app.argu.co/i18n/forms/editor/imageDialogTitle',
  },
  inputDialogCancelButton: {
    id: 'https://app.argu.co/i18n/forms/editor/inputDialogCancelButton',
  },
  inputDialogOKButton: {
    id: 'https://app.argu.co/i18n/forms/editor/inputDialogOKButton',
  },
  italicButton: {
    id: 'https://app.argu.co/i18n/forms/editor/italicButton',
  },
  linkButton: {
    id: 'https://app.argu.co/i18n/forms/editor/linkButton',
  },
  linkDialogText: {
    id: 'https://app.argu.co/i18n/forms/editor/linkDialogText',
  },
  linkDialogTitle: {
    id: 'https://app.argu.co/i18n/forms/editor/linkDialogTitle',
  },
  orderedListButton: {
    id: 'https://app.argu.co/i18n/forms/editor/orderedListButton',
  },
  underlineButton: {
    id: 'https://app.argu.co/i18n/forms/editor/underlineButton',
  },
  unorderedListButton: {
    id: 'https://app.argu.co/i18n/forms/editor/unorderedListButton',
  },
};

const useStyles = makeStyles((theme: any) => ({
  slateEditor: {
    minHeight: '100px',
    padding: '8px 11px',
    wordBreak: 'break-word',
  },
  slateItalic: {
    fontStyle: 'italic',
  },
  slateOrderedList: {
    listStyleType: 'decimal',
  },
  slateToolbar: {
    '& .MuiToggleButton-root': {
      '& svg': {
        height: '20px',
        width: '20px',
      },
      'border': 0,
      'marginRight': '1px',
      'padding': '.45em',
    },
    'borderBottom': `1px solid ${theme?.palette?.grey?.xLight}`,
    'display': 'grid',
    'grid-template-columns': 'repeat(auto-fit, 2.5em)',
    'margin': '0px',
    'padding': '2px',
  },
  slateUnorderedList: {
    '& ul': {
      '& ul': {
        listStyleType: 'square',
      },
      'listStyleType': 'circle',
    },
    'listStyleType': 'disc',
  },
  wrapper: {
    backgroundColor: theme?.palette?.grey?.xxLight,
    border: `1px solid ${theme?.palette?.grey?.xLight}`,
    borderRadius: '5px',
    flex: 1,
    position: 'relative',
  },
}));

const rootPropsClassName = (className: string) => ({
  rootProps: {
    className,
  },
});

const RichTextEditorWrapper: React.FC<RichTextEditorWrapperProps> = ({
  onChange,
  placeholder,
  value,
}) => {
  const classes = useStyles();
  const intl = useIntl();

  const defaultPlugins = useMemo(() => {
    const options  = mergeAndCompare(
      concatStrings(' '),
      defaultPluginsOptions,
      {
        italic: {
          italic: rootPropsClassName(classes.slateItalic),
        },
        list: {
          ol: rootPropsClassName(classes.slateOrderedList),
          ul: rootPropsClassName(classes.slateUnorderedList),
        },
      },
    ) as DefaultCommandPluginsOptions;

    options.bold.bold.buttonTitle = intl.formatMessage(messages.boldButton);
    options.codeBlock.code_block.buttonTitle = intl.formatMessage(messages.codeBlockButton);
    options.heading.h1.buttonTitle = intl.formatMessage(messages.heading1Button);
    options.heading.h2.buttonTitle = intl.formatMessage(messages.heading2Button);
    options.heading.h3.buttonTitle = intl.formatMessage(messages.heading3Button);
    options.image.img.buttonTitle = intl.formatMessage(messages.imageButton);
    options.image.img.dialogButtonCancel = intl.formatMessage(messages.inputDialogCancelButton);
    options.image.img.dialogButtonOK = intl.formatMessage(messages.inputDialogOKButton);
    options.image.img.dialogText = intl.formatMessage(messages.imageDialogText);
    options.image.img.dialogTitle = intl.formatMessage(messages.imageDialogTitle);
    options.italic.italic.buttonTitle = intl.formatMessage(messages.italicButton);
    options.link.link.buttonTitle = intl.formatMessage(messages.linkButton);
    options.link.link.dialogButtonCancel = intl.formatMessage(messages.inputDialogCancelButton);
    options.link.link.dialogButtonOK = intl.formatMessage(messages.inputDialogOKButton);
    options.link.link.dialogText = intl.formatMessage(messages.linkDialogText);
    options.link.link.dialogTitle = intl.formatMessage(messages.linkDialogTitle);
    options.list.ol.buttonTitle = intl.formatMessage(messages.orderedListButton);
    options.list.ul.buttonTitle = intl.formatMessage(messages.unorderedListButton);
    options.underline.underline.buttonTitle = intl.formatMessage(messages.underlineButton);

    return getDefaultPlugins(options);
  }, [classes]);

  return (
    <div className={classes.wrapper}>
      <RichTextEditorMd
        className={classes.slateEditor}
        placeholder={placeholder}
        plugins={defaultPlugins}
        toolbarClassName={classes.slateToolbar}
        value={value}
        onBlur={onChange}
        onChange={onChange}
      />
    </div>
  );
};

export default RichTextEditorWrapper;
