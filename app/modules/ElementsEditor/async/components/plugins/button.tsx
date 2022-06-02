import ButtonIcon from '@mui/icons-material/AddCircle';
import * as schema from '@ontologies/schema';
import { PlateEditor, ToolbarButton } from '@udecode/plate';
import {
  createPluginFactory,
  getPluginType,
  insertNodes,
} from '@udecode/plate-core';
import type { PlatePluginComponent } from '@udecode/plate-core/dist/types/plugins/PlatePluginComponent';
import {
  Type,
  useLRS,
  useTempRecord,
} from 'link-redux';
import React from 'react';

import argu from '../../../../../ontology/argu';
import elements from '../../../../../ontology/elements';
import { EditWrapper } from '../EditWrapper';
import { SetSubject } from '../SetSubject';

export const ELEMENT_BUTTON = 'button';

const Button: PlatePluginComponent = (props): JSX.Element => {
  const lrs = useLRS();

  const { ref, ...attributes } = props.attributes;

  const id = useTempRecord( elements.Button, (set) => {
    set(schema.image, props.element.image);
    set(elements.variant, props.element.variant);
    set(elements.iconPosition, props.element.iconPosition);
    set(elements.color, props.element.color);
    set(elements.href, props.element.href);
    set(argu.trackingId, props.element.trackingId);

    set(schema.text, props.element.children[0]?.text);
  }, [props.element]);

  return (
    <EditWrapper
      attributes={props.attributes}
      onClick={() => lrs.actions.ontola.showSnackbar('Clicked the edit icon!')}
    >
      <SetSubject
        subject={id}
        {...attributes}
      >
        <Type ref={ref}>
          {props.children}
        </Type>
      </SetSubject>
    </EditWrapper>
  );
};

const insertButton = (editor: PlateEditor, label: string) => {
  const text = {
    text: label,
  };
  const button = {
    children: [text],
    type: getPluginType(editor, ELEMENT_BUTTON),
  };

  insertNodes(editor, button);
};

export const ButtonToolbarButton = ({ editor }: { editor: PlateEditor }): JSX.Element => (
  <ToolbarButton
    icon={<ButtonIcon />}
    type={getPluginType(editor, ELEMENT_BUTTON)}
    onMouseDown={async (event) => {
      if (!editor) return;
      event.preventDefault();
      const label = window.prompt('Enter the button label');

      if (!label) return;
      insertButton(editor, label);
    }}
  />
);

export const createButtonPlugin = createPluginFactory({
  component: Button,
  isElement: true,
  isInline: true,
  isVoid: false,
  // isLeaf: true,
  key: ELEMENT_BUTTON,
});
