import { withToggleType, WithToggleTypeOptions } from '@udecode/slate-plugins';

import { CommandPlugin } from '../types';

export const ToggleTypePlugin = (options?: WithToggleTypeOptions): CommandPlugin => ({
  extendEditor: withToggleType(options),
});
