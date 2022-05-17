import { WithToggleTypeOptions, withToggleType } from '@udecode/slate-plugins';

import { CommandPlugin } from '../types';

export const toggleTypePlugin = (options?: WithToggleTypeOptions): CommandPlugin => ({
  commands: {},
  extendEditor: withToggleType(options),
});
