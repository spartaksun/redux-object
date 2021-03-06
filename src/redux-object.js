import keys from 'lodash/keys';
import has from 'lodash/has';
import isArray from 'lodash/isArray';
import isNull from 'lodash/isNull';

export default function build(reducer, objectName, id) {
  const ids = id.toString();
  const ret = {};
  const target = reducer[objectName][ids];

  if (!target) {
    return null;
  }

  if (target.id) {
    ret.id = target.id;
  }

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

            if (typeof rel.data !== 'undefined') {
              if (isArray(rel.data)) {
                ret[field] = rel.data.map(child => build(reducer, child.type, child.id));
              } else if (isNull(rel.data)) {
                ret[field] = null;
              } else {
                ret[field] = build(reducer, rel.data.type, rel.data.id);
              }
            } else {
              if (rel.links) {
                throw new Error('Remote lazy loading is not implemented for redux-object. Please refer https://github.com/yury-dymov/json-api-normalizer/issues/2');
              }

              ret[field] = [];
            }

            return ret[field];
          },
        },
      );
    });
  }

  if (!has(ret, 'id')) {
    ret.id = ids;
  }

  return ret;
}
