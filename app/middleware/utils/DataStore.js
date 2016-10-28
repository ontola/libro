/* eslint no-param-reassign: 0 */
export const toCamel = key => key.replace(/(_\w)/g, substring =>
  substring.toUpperCase().replace('_', '')
);

export default class DataStore {
  /**
   * @param {array} models An array with Immutable Records
   */
  constructor(models) {
    this.types = {};

    models.forEach((Record) => {
      this.types[new Record().getIn(['apiDesc', 'type'])] = Record;
    });
  }

  formatEntity({ id, type, attributes, relationships }) {
    const entity = {};

    Object.assign(entity, { id });

    if (attributes) {
      // Normalize all keys & values
      Object.keys(attributes).forEach((key) => {
        const camel = toCamel(key);
        if (camel.match(/(Date|At)$/)) {
          attributes[key] = new Date(attributes[key]);
        }
        if (key !== camel) {
          attributes[camel] = attributes[key];
          delete attributes[key];
        }
      });
      Object.assign(entity, attributes);
    }

    // Check if relationships exist, if so add their ids in an array to the corresponding key
    if (relationships) {
      Object.keys(relationships).forEach((key) => {
        const relation = relationships[key].data;
        const camelKey = toCamel(key);

        if (relation !== undefined) {
          if (relation === null) {
            entity[camelKey] = null;
          } else if (relation.constructor === Array) {
            entity[camelKey] = relation.map(ent => ent.id);
          } else {
            entity[camelKey] = relation.id;
          }
        }
      });
    }
    return new this.types[type](entity);
  }
}
