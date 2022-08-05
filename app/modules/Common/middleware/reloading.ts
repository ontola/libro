import { LinkReduxLRSType } from 'link-redux';

import { CONTAINER_ELEMENT } from '../../../config';
import { handle } from '../../../helpers/logging';
import spinner from '../lib/spinner';

import { HideDialog } from './actions';

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
  lrs.actions.get(HideDialog)();

  if (lrs.api) {
    try {
      (lrs.api as any).channel?.disconnect();
    } catch (e) {
      handle(e);
    }
  }
}

export function reloadPage(lrs: LinkReduxLRSType): void {
  unloadPage(lrs);

  window.location.reload();
}

export function redirectPage(lrs: LinkReduxLRSType, location: string): void {
  unloadPage(lrs);

  if (window.location.pathname === new URL(location).pathname) {
    window.location.href = location;
    window.location.reload();
  } else {
    window.location.href = location;
  }
}
