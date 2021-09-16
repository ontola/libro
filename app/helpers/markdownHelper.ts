import React from 'react';
import removeMd from 'remove-markdown';

const removeMdOpts = {
  // Allow Github Flavored markdown
  gfm: true,
};

export const stripMarkdown = (text: string | undefined): string | undefined => (
  text && removeMd(text, removeMdOpts).replace(/[\r\n]/g, ' ')
);

/**
 * Removes markdown syntax, replaces newlines with spaces.
 * @param {string} text
 * @returns {string}
 */
export const useStrippedMarkdown = (text: string | undefined): string | undefined => React.useMemo(() => (
  stripMarkdown(text)
), [text]);
