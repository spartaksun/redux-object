import keys from 'lodash/keys';

export default function build(reducer, objectName, id) {
  const ret = {};

  const target = reducer[objectName][id.toString()];

  if (target) {
    keys(target.attributes).forEach((key) => { ret[key] = target.attributes[key]; });

    if (target.relationships) {
      keys(target.relationships).forEach((relationship) => {
        Object.defineProperty(
          ret,
          relationship,
          {
            get: () => {
              const field = `__${relationship}`;

              if (ret[field]) {
                return ret[field];
              }

              const rel = target.relationships[relationship];
              const ids = rel.id.split(',');

              if (ids.length === 1) {
                ret[field] = build(reducer, rel.type, ids[0]);
              } else {
                ret[field] = ids.map(childId => build(reducer, rel.type, childId));
              }

              return ret[field];
            },
          },
        );
      });
    }
  }

  return ret;
}