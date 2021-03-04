import { LinkReduxLRSType } from 'link-redux';

import { CONTAINER_ELEMENT } from '../config';
import { handle } from '../helpers/logging';
import spinner from '../helpers/spinner';

function showSpinner() {
  try {
    const preloader = document.createElement('div');
    preloader.innerHTML = spinner;
    preloader.classList.add('preloader');
    const element = document.getElementById(CONTAINER_ELEMENT);

    if (element) {
      element.appendChild(preloader);
    }
  } catch (e) {
    handle(e);
  }
}

function unloadPage(lrs: LinkReduxLRSType) {
  showSpinner();
  lrs.actions.ontola.hideDialog();

  if (lrs.api) {
    try {
      (lrs.api as any).channel.disconnect();
    } catch (e) {
      handle(e);
    }
  }
}

export function reloadPage(lrs: LinkReduxLRSType, forceGet: boolean): void {
  unloadPage(lrs);

  window.location.reload(forceGet);
}

export function redirectPage(lrs: LinkReduxLRSType, location: string): void {
  unloadPage(lrs);

  if (window.location.pathname === new URL(location).pathname) {
    window.location.href = location;
    window.location.reload(true);
  } else {
    window.location.href = location;
  }
}
