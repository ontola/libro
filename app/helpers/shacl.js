import { NS } from './LinkedRenderStore';

class SHACL {
  static processNodeShape(lrs, shape) {
    const property = lrs.getResourceProperties(shape, NS.sh('property'));

    const obj = {};

    for (let i = 0; i < property.length; i++) {
      const [path, v] = this.processPropertyShape(lrs, property[i], shape);
      const k = path.value;
      if (v) {
        if (obj[k] && Array.isArray(obj[k])) {
          obj[k].push(v);
        } else if (obj[k]) {
          obj[k] = [obj[k], v];
        } else {
          obj[k] = v;
        }
      }
    }

    return obj;
  }

  static processPropertyShape(lrs, shape, nodeShape) {
    const targetNode = lrs.getResourceProperty(nodeShape, NS.sh('targetNode'));
    const klass = lrs.getResourceProperty(shape, NS.sh('class'));
    const path = lrs.getResourceProperty(shape, NS.sh('path'));

    let value;

    if (path && klass) {
      const dataProperties = lrs.getResourceProperties(targetNode, path);
      const dataPropertyShape = lrs.store.anyStatementMatching(null, NS.sh('targetClass'), klass, null).subject;

      value = [];
      for (let i = 0; i < dataProperties.length; i++) {
        value.push(this.processSHACLResource(lrs, dataPropertyShape, dataProperties[i]));
      }
    } else if (targetNode) {
      value = lrs.getResourceProperty(targetNode, path);
    } else if (nodeShape) {
      value = lrs.getResourceProperty(nodeShape, path);
    } else {
      throw new Error('Unhandled branch');
    }

    return [path, value];
  }

  static processSHACLResource(lrs, shape, resource) {
    const shapeEntry = lrs.getResourceProperty(shape, NS.rdf('type'));

    switch (shapeEntry) {
      case NS.sh('NodeShape'):
        return this.processNodeShape(lrs, shape);
      case NS.sh('PropertyShape'):
        return this.processPropertyShape(lrs, shape, resource);
      case NS.sh('PropertyGroup'):
        // Groups are only relevant for display purposes
        return undefined;
      default:
        throw new TypeError("Unknown shape class given (or it has multiple, which we can't handle yet)");
    }
  }

  static actionToObject(lrs, action) {
    const target = lrs.getResourceProperty(action, NS.schema('target'));
    const shapeEntry = target && lrs.getResourceProperty(target, NS.ll('actionBody'));

    if (!shapeEntry) {
      return {};
    }

    return this.processSHACLResource(lrs, shapeEntry, target);
  }
}

export default SHACL;
