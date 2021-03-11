import { CheckResult } from './check';

// eslint-disable-next-line consistent-return
function humanStatus(result) {
  // eslint-disable-next-line default-case
  switch (result) {
  case CheckResult.pass:
    return '🟩 pass';
  case CheckResult.fail:
    return '🟥 fail';
  case CheckResult.warn:
    return '🟨 warn';
  }
}

function renderRow(verdict) {
  const status = humanStatus(verdict.result);
  const message = verdict.result === CheckResult.pass ? 'N/A' : verdict.message;
  const debug = __DEVELOPMENT__ ? `<td>${verdict.debug || ''}</td>` : '';

  return `<tr><td>${verdict.name}</td><td>${status}</td><td>${message}</td>${debug}</tr>`;
}

export default function renderHtml(result) {
  const rows = result.map(renderRow);

  return `
    <!DOCTYPE html>
    <html>
        <head><style>thead { background-color: turquoise; } tr:nth-child(even) { background-color: aliceblue; }</style></head>
        <body>
        <table>
          <thead>
            <tr>
              <td>Check</td>
              <td>Result</td>
              <td>Message</td>
              ${__DEVELOPMENT__ ? '<td>Debug</td>' : ''}
            </tr>
          </thead>
          <tbody>${rows.join('\n')}</tbody>
        </table>
        </body>
    </html>`;
}
