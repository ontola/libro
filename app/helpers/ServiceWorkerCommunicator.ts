import { LinkReduxLRSType } from 'link-redux';
import { Statement } from 'rdflib';

import LinkedRenderStore from './LinkedRenderStore';
import { handle } from './logging';

class ServiceWorkerCommunicator {
  private controller!: ServiceWorker | null;
  private lrs?: LinkReduxLRSType;
  private readonly updatesChannel!: BroadcastChannel;

  constructor() {
    if (!('serviceWorker' in navigator)) {
      // Mock the communicator for browsers which don't have service workers
      return {
        clearCache() { return void(0); },
        async dataUpdate(_: MessageEvent) { return void(0); },
        postMessage(_: any, __?: Transferable[]) { return void(0); },
      } as unknown as ServiceWorkerCommunicator;
    }

    this.controller = navigator.serviceWorker.controller;
    navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
      if (serviceWorkerRegistration.active) {
        this.controller = serviceWorkerRegistration.active;
      }
    });
    navigator.serviceWorker.addEventListener('controllerchange', (e) => {
      this.controller = (e.target as unknown as ServiceWorkerCommunicator).controller;
    });
    if (typeof BroadcastChannel !== 'undefined') {
      this.updatesChannel = new BroadcastChannel('data-updates');
      this.updatesChannel.addEventListener('message', this.dataUpdate.bind(this));
    } else {
      handle(new Error('Browser without BroadcastChannel'));
    }
  }

  public set linkedRenderStore(value: LinkReduxLRSType) {
    this.lrs = value;
  }

  public clearCache() {
    this.postMessage({
      meta: 'ontola-request',
      type: 'CLEAR_CACHE_REQUEST',
    });
  }

  public async dataUpdate(event: MessageEvent) {
    if (!this.lrs) {
      throw new Error('Invariant violation: lrs must be set before receiving data updates');
    }

    const { cacheName, updatedUrl } = event.data.payload;

    // Do something with cacheName and updatedUrl.
    // For example, get the cached content and update
    // the content on the page.
    const cache = await caches.open(cacheName);
    const updatedResponse = await cache.match(updatedUrl);

    (this.lrs as any)
      .api
      .feedResponse(updatedResponse)
      .then((statements: Statement[]) => {
        (LinkedRenderStore as any).store.processDelta(statements);
        (LinkedRenderStore as any).broadcast();
      });
  }

  private postMessage(message: any, transfer?: Transferable[]) {
    if (!this.controller) {
      handle(new Error('SW Controller not defined'));
      return;
    }

    this.controller.postMessage(message, transfer);
  }
}

export default ServiceWorkerCommunicator;
