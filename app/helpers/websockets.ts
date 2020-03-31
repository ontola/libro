import { LinkReduxLRSType } from 'link-redux';

import app from '../ontology/app';
import ontola from '../ontology/ontola';

export async function initializeCable(lrs: LinkReduxLRSType, websocketPath: string) {
  const websocketAddress = app.ns(websocketPath).value.replace('https://', 'wss://');
  const ActionCable = await import('actioncable');
  (lrs.api as any).channel = ActionCable.createConsumer(websocketAddress);
}

export function subscribeDeltaChannel(lrs: LinkReduxLRSType, channel: string) {
  (lrs.api as any)
      .channel
      .subscriptions
      .create(
          channel,
          {
            connected: () => {
              lrs.exec(ontola.ns(`ws/connected?channel=${channel}`));
            },
            disconnected: () => {
              lrs.exec(ontola.ns(`ws/disconnected?channel=${channel}`));
            },
            received: (msg: any) => {
              lrs.exec(ontola.ns(`ws/received?channel=${channel}`), msg);
            },
            rejected: () => {
              lrs.exec(ontola.ns(`ws/rejected?channel=${channel}`));
            },
          },
        );
}
