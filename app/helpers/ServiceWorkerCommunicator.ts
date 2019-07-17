import { LinkReduxLRSType } from 'link-redux';

import { handle } from './logging';

class ServiceWorkerCommunicator {
  private currentController!: ServiceWorker | null;
  private lrs?: LinkReduxLRSType;
  private readonly updatesChannel!: BroadcastChannel;

  constructor() {
    if (!(typeof navigator === 'object' && 'serviceWorker' in navigator)) {
      // Mock the communicator for browsers which don't have service workers
      return {
        clearCache() { return void(0); },
        async dataUpdate(_: MessageEvent) { return void(0); },
        postMessage(_: any, __?: PostMessageOptions) { return void(0); },
      } as unknown as ServiceWorkerCommunicator;
    }

    this.controller = navigator.serviceWorker.controller;
    navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
      if (serviceWorkerRegistration.active) {
        this.controller = serviceWorkerRegistration.active;
      }
    });
    if (typeof BroadcastChannel !== 'undefined') {
      this.updatesChannel = new BroadcastChannel('data-updates');
      this.updatesChannel.addEventListener('message', this.dataUpdate.bind(this));
    } else {
      handle(new Error('Browser without BroadcastChannel'));
    }

    this.onControllerChange = this.onControllerChange.bind(this);
  }

  public get controller() {
    if (!this.currentController) {
      throw new TypeError('ServiceWorker controller called before load');
    }
    return this.currentController;
  }

  public set controller(value: ServiceWorker | null) {
    if (!value && this.currentController) {
      throw new TypeError("Can't unset serviceworker");
    }
    if (this.currentController) {
      this.currentController.removeEventListener('controllerchange', this.onControllerChange);
      this.currentController.removeEventListener('statechange', this.onControllerChange);
      this.currentController.removeEventListener('error', (handle as any));
    }

    this.currentController = value;

    if (!this.currentController) {
      return;
    }

    if (this.currentController.state === 'redundant') {
      navigator.serviceWorker
          .getRegistration()
          .then((reg) => {
            if (reg && reg.active) {
              this.controller = reg.active;
            } else {
              handle(new Error('Serviceworker redundant and registration undefined or not active'));
            }
          })
          .catch(handle);
    }

    this.currentController.addEventListener('controllerchange', this.onControllerChange);
    this.currentController.addEventListener('statechange', this.onControllerChange);
    this.currentController.addEventListener('error', (handle as any));
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

    (this.lrs.api as any)
      .feedResponse(updatedResponse)
      .then(() => {
        (this.lrs as any).broadcast();
      });
  }

  private onControllerChange(e: Event): void {
    if (e.type === 'statechange') {
      this.controller = e.target as ServiceWorker | null;
    } else {
      this.controller = (e.target as unknown as ServiceWorkerCommunicator).controller;
    }
  }

  private postMessage(message: any, transfer?: PostMessageOptions) {
    if (!this.controller) {
      handle(new Error('SW Controller not defined'));
      return;
    }

    this.controller.postMessage(message, transfer);
  }
}

export default ServiceWorkerCommunicator;
