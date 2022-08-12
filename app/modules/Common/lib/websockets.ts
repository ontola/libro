import { LinkReduxLRSType } from 'link-redux';

import libro from '../../Kernel/ontology/libro';
import app from '../ontology/app';

export async function initializeCable(lrs: LinkReduxLRSType, websocketPath: string): Promise<void> {
  const websocketAddress = app.ns(websocketPath).value.replace('https://', 'wss://');
  const ActionCable = await import(
    /* webpackChunkName: "actioncable" */
    '@rails/actioncable'
  );
  (lrs.api as any).channel = ActionCable.createConsumer(websocketAddress);
}

export function subscribeDeltaChannel(lrs: LinkReduxLRSType, channel: string): void {
  (lrs.api as any)
    .channel
    .subscriptions
    .create(
      channel,
      {
        connected: () => {
          lrs.exec(libro.ns(`ws/connected?channel=${channel}`));
        },
        disconnected: () => {
          lrs.exec(libro.ns(`ws/disconnected?channel=${channel}`));
        },
        received: (msg: any) => {
          lrs.exec(libro.ns(`ws/received?channel=${channel}`), msg);
        },
        rejected: () => {
          lrs.exec(libro.ns(`ws/rejected?channel=${channel}`));
        },
      },
    );
}
