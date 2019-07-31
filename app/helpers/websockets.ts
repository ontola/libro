import { LinkReduxLRSType } from 'link-redux';

export async function initializeCable(lrs: LinkReduxLRSType, websocketPath: string) {
  const websocketAddress = lrs.namespaces.app(websocketPath).value.replace('https://', 'ws://');
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
              lrs.exec(lrs.namespaces.ontola(`ws/connected?channel=${channel}`));
            },
            disconnected: () => {
              lrs.exec(lrs.namespaces.ontola(`ws/disconnected?channel=${channel}`));
            },
            received: (msg: any) => {
              lrs.exec(lrs.namespaces.ontola(`ws/received?channel=${channel}`), msg);
            },
            rejected: () => {
              lrs.exec(lrs.namespaces.ontola(`ws/rejected?channel=${channel}`));
            },
          },
        );
}
