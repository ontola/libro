import { PlainFactory, setup } from '@ontologies/core';

class FixedPlainFactory extends PlainFactory {
  defaultGraph() {
    return this.namedNode('rdf:defaultGraph');
  }

  // eslint-disable-next-line class-methods-use-this
  fromId(obj) {
    if (typeof obj !== 'string') {
      throw new Error('Cannot revert non-strings into rdf objects');
    }

    if (obj.startsWith('_:')) {
      return this.blankNode(obj.split('_:').pop());
    } else if (obj.startsWith('<') && obj.endsWith('>')) {
      return this.namedNode(obj.slice(1, -1));
    } else if (obj.startsWith('"')) {
      let languageOrId;
      if (obj.includes('@')) {
        languageOrId = obj.split('@').pop();
      } else if (obj.includes('^^')) {
        languageOrId = this.fromId(obj.split('^^').pop());
      }

      return this.literal(
        obj.slice(1, obj.lastIndexOf('"')),
        languageOrId
      );
    }

    throw new Error(`Malformed input '${obj}'`);
  }

  namedNode(value) {
    const nn = PlainFactory.prototype.namedNode.call(this, value);
    nn.toString = () => `<${value}>`;

    return nn;
  }

  quad(subject, predicate, object, graph) {
    /* eslint-disable sort-keys */
    return {
      subject,
      predicate,
      object,
      graph: graph || this.defaultGraph(),

      get why() {
        return this.graph;
      },
      set why(_) {
        throw new Error('Treat quads as immutable!');
      },
    };
    /* eslint-enable sort-keys */
  }
}

setup(new FixedPlainFactory());
