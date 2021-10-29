import { LinkReduxLRSType } from 'link-redux';

import {
  getAuthenticityToken,
  getLinkContent,
  getMetaContent,
} from './dom';

function patchRequestInitGenerator(lrs: LinkReduxLRSType): void {
  (lrs as any).api.requestInitGenerator.constructor.prototype.authenticityHeader =
        function patchedAuthenticityHeader(options: {[k: string]: string} = {}) {
          return Object.assign({}, options, {
            'Manifest': getLinkContent('manifest'),
            'Website-Iri': getMetaContent('website'),
            'X-CSRF-Token': getAuthenticityToken(),
            'X-Requested-With': this.xRequestedWith,
          });
        };
}

export default patchRequestInitGenerator;
