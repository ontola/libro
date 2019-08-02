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

export function reloadPage(forceGet: boolean) {
  showSpinner();

  window.location.reload(forceGet);
}

export function redirectPage(location: string) {
  showSpinner();

  window.location.href = location;
}
