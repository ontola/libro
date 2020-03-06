import { CheckResult } from './check';

function renderRow(verdict) {
  if (verdict.result === CheckResult.pass) {
    return `<tr><td>${verdict.name}</td><td>🟩 pass</td><td></td><td></td></tr>`;
  }

  const status = verdict.result === CheckResult.fail ? '🟥 fail' : '🟨 warn';
  const debug = __DEVELOPMENT__ ? `<td>${verdict.debug || ''}</td>` : '';

  return `<tr><td>${verdict.name}</td><td>${status}</td><td>${verdict.message}</td>${debug}</tr>`;
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
