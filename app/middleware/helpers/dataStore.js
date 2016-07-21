class JsonApiDataStore {
  constructor() {
    this.graph = {};
  }

  makeGraph(type, id) {
    this.graph[type] = this.graph[type] || {};
    this.graph[type][id] = this.graph[type][id] || {};
    return this.graph[type][id];
  }

  processEntity(record) {
    const {
      id,
      type,
      attributes,
      relationships,
    } = record;

    this.graph[type] = this.graph[type] || {};
    this.graph[type][id] = this.graph[type][id] || {};
    const entity = this.graph[type][id];

    // Assign all attributes to the entity
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

    return entity;
  }

  addEntityToStore(payload) {
    const processEntity = this.processEntity.bind(this);
    const ifArray = payload.data.constructor === Array;

    if (!payload.data) return [];
    if (payload.included) payload.included.map(processEntity);

    return (ifArray) ? payload.data.map(processEntity) : processEntity(payload.data);
  }
}

module.exports = {
  JsonApiDataStore,
};
