import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React from 'react';

import { ElementsWrapperProps } from '../lib/ElementsWrapperProps';

import { ElementsEditor } from './components';
import { deepRecordToElementsValue } from './lib/deepRecordToElementsValue';
import { editorClassName } from './lib/editorClassName';

// const messages = {
//   boldButton: {
//     id: 'https://app.argu.co/i18n/forms/editor/boldButton',
//   },
//   codeBlockButton: {
//     id: 'https://app.argu.co/i18n/forms/editor/codeBlockButton',
//   },
//   heading1Button: {
//     id: 'https://app.argu.co/i18n/forms/editor/heading1Button',
//   },
//   heading2Button: {
//     id: 'https://app.argu.co/i18n/forms/editor/heading2Button',
//   },
//   heading3Button: {
//     id: 'https://app.argu.co/i18n/forms/editor/heading3Button',
//   },
//   imageButton: {
//     id: 'https://app.argu.co/i18n/forms/editor/imageButton',
//   },
//   imageDialogText: {
//     id: 'https://app.argu.co/i18n/forms/editor/imageDialogText',
//   },
//   imageDialogTitle: {
//     id: 'https://app.argu.co/i18n/forms/editor/imageDialogTitle',
//   },
//   inputDialogCancelButton: {
//     id: 'https://app.argu.co/i18n/forms/editor/inputDialogCancelButton',
//   },
//   inputDialogOKButton: {
//     id: 'https://app.argu.co/i18n/forms/editor/inputDialogOKButton',
//   },
//   italicButton: {
//     id: 'https://app.argu.co/i18n/forms/editor/italicButton',
//   },
//   linkButton: {
//     id: 'https://app.argu.co/i18n/forms/editor/linkButton',
//   },
//   linkDialogText: {
//     id: 'https://app.argu.co/i18n/forms/editor/linkDialogText',
//   },
//   linkDialogTitle: {
//     id: 'https://app.argu.co/i18n/forms/editor/linkDialogTitle',
//   },
//   orderedListButton: {
//     id: 'https://app.argu.co/i18n/forms/editor/orderedListButton',
//   },
//   underlineButton: {
//     id: 'https://app.argu.co/i18n/forms/editor/underlineButton',
//   },
//   unorderedListButton: {
//     id: 'https://app.argu.co/i18n/forms/editor/unorderedListButton',
//   },
// };

const useStyles = makeStyles((theme: any) => ({
  container: {
    backgroundColor: theme?.palette?.grey?.xxLight,
    border: `1px solid ${theme?.palette?.grey?.xLight}`,
    borderRadius: '5px',
    height: '100%',
    overflowY: 'scroll',
  },
  wrapper: {
    backgroundColor: 'white',
    flex: 1,
    height: '100%',
    overflow: 'hidden',
    paddingBottom: '4em',
    position: 'relative',
  },
}));

const ElementsWrapper: React.FC<ElementsWrapperProps> = ({
  placeholder,
  value,
}) => {
  const classes = useStyles();
  // const intl = useIntl();

  //   options.bold.bold.buttonTitle = intl.formatMessage(messages.boldButton);
  //   options.codeBlock.code_block.buttonTitle = intl.formatMessage(messages.codeBlockButton);
  //   options.heading.h1.buttonTitle = intl.formatMessage(messages.heading1Button);
  //   options.heading.h2.buttonTitle = intl.formatMessage(messages.heading2Button);
  //   options.heading.h3.buttonTitle = intl.formatMessage(messages.heading3Button);
  //   options.image.img.buttonTitle = intl.formatMessage(messages.imageButton);
  //   options.image.img.dialogButtonCancel = intl.formatMessage(messages.inputDialogCancelButton);
  //   options.image.img.dialogButtonOK = intl.formatMessage(messages.inputDialogOKButton);
  //   options.image.img.dialogText = intl.formatMessage(messages.imageDialogText);
  //   options.image.img.dialogTitle = intl.formatMessage(messages.imageDialogTitle);
  //   options.italic.italic.buttonTitle = intl.formatMessage(messages.italicButton);
  //   options.link.link.buttonTitle = intl.formatMessage(messages.linkButton);
  //   options.link.link.dialogButtonCancel = intl.formatMessage(messages.inputDialogCancelButton);
  //   options.link.link.dialogButtonOK = intl.formatMessage(messages.inputDialogOKButton);
  //   options.link.link.dialogText = intl.formatMessage(messages.linkDialogText);
  //   options.link.link.dialogTitle = intl.formatMessage(messages.linkDialogTitle);
  //   options.list.ol.buttonTitle = intl.formatMessage(messages.orderedListButton);
  //   options.list.ul.buttonTitle = intl.formatMessage(messages.unorderedListButton);
  //   options.underline.underline.buttonTitle = intl.formatMessage(messages.underlineButton);
  //
  //   return getDefaultPlugins(options);
  // }, [classes]);

  return (
    <div className={clsx(classes.wrapper, editorClassName)}>
      <div className={classes.container}>
        <ElementsEditor
          id={value._id.value}
          // plugins={defaultPlugins}
          placeholder={placeholder}
          value={deepRecordToElementsValue(value)}
          // onBlur={onChange}
          // onChange={onChange}
        />
      </div>
    </div>
  );
};

export default ElementsWrapper;
