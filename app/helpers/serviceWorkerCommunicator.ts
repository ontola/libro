import { LinkReduxLRSType } from 'link-redux';
import { Statement } from 'rdflib';

import LinkedRenderStore from './LinkedRenderStore';

class ServiceWorkerCommunicator {
  private controller!: ServiceWorker | null;
  private readonly lrs!: LinkReduxLRSType;
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
    this.lrs = LinkedRenderStore;
    this.updatesChannel = new BroadcastChannel('data-updates');
    this.updatesChannel.addEventListener('message', this.dataUpdate.bind(this));
  }

  public clearCache() {
    this.postMessage({
      meta: 'ontola-request',
      type: 'CLEAR_CACHE_REQUEST',
    });
  }

  public async dataUpdate(event: MessageEvent) {
    const { cacheName, updatedUrl } = event.data.payload;

    // Do something with cacheName and updatedUrl.
    // For example, get the cached content and update
    // the content on the page.
    const cache = await caches.open(cacheName);
    const updatedResponse = await cache.match(updatedUrl);

    (this.lrs as any)
      .api
      .processor
      .feedResponse(updatedResponse)
      .then((statements: Statement[]) => {
        (LinkedRenderStore as any).store.processDelta(statements);
        (LinkedRenderStore as any).broadcast();
      });
  }

  private postMessage(message: any, transfer?: Transferable[]) {
    if (!this.controller) {
      // TODO: bugsnag
      throw new Error('Controller not defined');
    }

    this.controller.postMessage(message, transfer);
  }
}

export default new ServiceWorkerCommunicator();
