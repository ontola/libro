export default class DataStore {
  /**
   * @param {array} models An array with Immutable Records
   */
  constructor(models) {
    this.types = {};

    models.forEach(Record => {
      this.types[new Record().getIn(['apiDesc', 'type'])] = Record;
    });
  }

  toCamel(string) {
    return string.replace(/(\-[a-z])/g, substring =>
      substring.toUpperCase().replace('-', '')
    );
  }

  formatEntity({ id, type, attributes, relationships }) {
    const entity = {};
    // const normalizedAttributes = {};

    Object.assign(entity, { id });

    // Normalize all keys
    Object.keys(attributes).forEach(key => this.toCamel(key));
    Object.assign(entity, attributes);

    // Check if relationships exist, if so add there ids in an array to the corresponding key
    if (relationships) {
      Object.keys(relationships).forEach(key => {
        const relation = relationships[key].data;
        if (relation !== undefined) {
          if (relation === null) {
            entity[key] = null;
          } else if (relation.constructor === Array) {
            entity[key] = relation.map(ent => ent.id);
          } else {
            entity[key] = relation.id;
          }
        }
      });
    }

    return new this.types[type](entity);
  }
}
