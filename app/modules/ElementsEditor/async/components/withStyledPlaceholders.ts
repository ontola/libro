import {
  ELEMENT_H1,
  ELEMENT_PARAGRAPH,
  withPlaceholders,
} from '@udecode/plate';
import { PlatePluginComponent } from '@udecode/plate-core';

export const withStyledPlaceHolders = (components: Record<string, PlatePluginComponent>): Record<string, PlatePluginComponent> =>
  withPlaceholders(components, [
    {
      hideOnBlur: true,
      key: ELEMENT_PARAGRAPH,
      placeholder: 'Type a paragraph',
    },
    {
      hideOnBlur: false,
      key: ELEMENT_H1,
      placeholder: 'Untitled',
    },
  ]);
