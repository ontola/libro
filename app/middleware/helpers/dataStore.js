const formatEntity = (record) => {
  const {
    id,
    attributes,
    relationships,
  } = record;

  const entity = {};

  // Assign all attributes to the entity
  Object.assign(entity, attributes);

  // Add id to entity
  Object.assign(entity, {
    id,
  });

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

  // return formatted entity and type of entity
  return entity;
};

const entityStore = (entity, type) => {
  const store = {};
  store[type] = store[type] || [];
  store[type].push(formatEntity(entity));
  return store;
};

const formatEntities = (payload) => {
  const {
    data,
    included,
  } = payload;

  const entities = {};

  if (!data) return [];

  if (included) {
    included.map(entity => {
      const newEntities = entityStore(entity, entity.type);
      return Object.assign(entities, newEntities);
    });
  }

  if (data.constructor === Array) {
    const newEntities = data.map(e => entityStore(e, e.type));
    Object.assign(entities, newEntities);
  } else {
    const newEntities = entityStore(data, data.type);
    Object.assign(entities, newEntities);
  }

  return entities;
};

export {
  formatEntities,
};
