import { CheckResult } from './check';

const checkAlignPadding = 40;
const resultAlignPadding = 9;
const headerBodySeparator = `${''.padEnd(checkAlignPadding, '-')}|${''.padEnd(resultAlignPadding, '-')}|${''.padEnd(checkAlignPadding, '-')}\n`;

function renderRow(verdict) {
  const paddedName = verdict.name.padEnd(checkAlignPadding);

  switch (verdict.result) {
    case CheckResult.pass:
      return `${paddedName}| 🟩 pass |\n`;
    case CheckResult.warn:
      return `${paddedName}| 🟨 warn | ${verdict.message}\n`;
    case CheckResult.fail:
      return `${paddedName}| 🟥 fail | ${verdict.message}\n`;
    default:
      throw new Error('Unknown verdict status');
  }
}

export default function renderMarkdown(result) {
  let body = `${'Check'.padEnd(checkAlignPadding)}| Result  | Message\n`;
  body += headerBodySeparator;

  for (const verdict of result) {
    body += renderRow(verdict);
  }

  return body;
}
