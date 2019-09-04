import { LinkReduxLRSType } from 'link-redux';
import { getMetaContent } from './arguHelpers';

function patchRequestInitGenerator(lrs: LinkReduxLRSType) {
    (lrs as any).api.requestInitGenerator.constructor.prototype.authenticityHeader =
        function patchedAuthenticityHeader(options: {[k: string]: string} = {}) {
            return Object.assign({}, options, {
                'Website-Iri': getMetaContent('website-iri'),
                'X-CSRF-Token': this.getAuthenticityToken(),
                'X-Requested-With': this.xRequestedWith,
            });
        };
}

export default patchRequestInitGenerator;