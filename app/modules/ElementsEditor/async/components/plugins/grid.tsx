import { Grid4x4 } from '@mui/icons-material';
import {
  ELEMENT_DEFAULT,
  PlateEditor,
  ToolbarButton,
} from '@udecode/plate';
import {
  createPluginFactory,
  getPluginType,
  insertNodes,
} from '@udecode/plate-core';
import type { PlatePluginComponent } from '@udecode/plate-core/dist/types/plugins/PlatePluginComponent';
import {
  Resource,
  Type,
  useLRS,
  useTempRecord,
} from 'link-redux';
import React from 'react';

import elements from '../../../../Elements/ontology/elements';
import { EditWrapper } from '../EditWrapper';
import { SetSubject } from '../SetSubject';

export const ELEMENT_GRID = 'grid';

const Grid: PlatePluginComponent = (props): JSX.Element => {
  const lrs = useLRS();

  const { ref, ...attributes } = props.attributes;

  const id = useTempRecord(elements.Grid, (set) => {
    set(elements.minWidth, props.attributes.minWidth);
    set(elements.gap, props.attributes.gap);
  }, []);

  return (
    <EditWrapper
      attributes={props.attributes}
      onClick={() => lrs.actions.ontola.showSnackbar('Clicked the grid edit icon!')}
    >
      <SetSubject
        subject={id}
        {...attributes}
      >
        <Resource subject={id}>
          <Type ref={ref}>
            {props.children}
          </Type>
        </Resource>
      </SetSubject>
    </EditWrapper>
  );
};

const insertGrid = (editor: PlateEditor, label: string) => {
  const text = {
    children: [
      {
        text: label,
      },
    ],
    type: ELEMENT_DEFAULT,
  };
  const grid = {
    children: [text],
    type: getPluginType(editor, ELEMENT_GRID),
  };

  insertNodes(editor, grid);
};

export const GridToolbarButton = ({ editor }: { editor: PlateEditor }): JSX.Element => (
  <ToolbarButton
    icon={<Grid4x4 />}
    type={getPluginType(editor, ELEMENT_GRID)}
    onMouseDown={async (event) => {
      if (!editor) return;
      event.preventDefault();
      const label = window.prompt('Enter the first Grid element');

      if (!label) return;
      insertGrid(editor, label);
    }}
  />
);

export const createGridPlugin = createPluginFactory({
  component: Grid,
  isElement: true,
  isInline: false,
  isLeaf: false,
  key: ELEMENT_GRID,
});
