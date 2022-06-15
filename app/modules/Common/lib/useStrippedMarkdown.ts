import React from 'react';

import { stripMarkdown } from './markdownHelper';

/**
 * Removes markdown syntax, replaces newlines with spaces.
 * @param {string} text
 * @returns {string}
 */
export const useStrippedMarkdown = (text: string | undefined): string | undefined => React.useMemo(() => (
  stripMarkdown(text)
), [text]);
