import { LinkReduxLRSType } from 'link-redux';
import { NamedNode } from 'rdflib';

// [AOD-303] TODO: This is shit.
export function purgeCollection(lrs: LinkReduxLRSType, action: NamedNode) {
    const target = lrs.getResourceProperty(action, lrs.namespaces.schema('target')) as NamedNode;
    const targetCollection = lrs.getResourceProperty(target, lrs.namespaces.schema('url')) as NamedNode;
    const u = new URL(targetCollection.value);
    const type = u.searchParams.get('type');
    u.searchParams.delete('type');
    u.searchParams.set('page', '1');
    if (type) {
        u.searchParams.set('type', type);
    } else {
        u.searchParams.set('type', 'paginated');
    }
    const first = NamedNode.find(u.toString());
    lrs.getEntity(targetCollection, { reload: true });
    lrs.getEntity(first, { reload: true });
}
