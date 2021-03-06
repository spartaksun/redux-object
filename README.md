# redux-object

[![npm version](https://img.shields.io/npm/v/redux-object.svg?style=flat)](https://www.npmjs.com/package/redux-object)
[![Downloads](http://img.shields.io/npm/dm/redux-object.svg?style=flat-square)](https://npmjs.org/package/redux-object)
[![Build Status](https://img.shields.io/travis/yury-dymov/redux-object/master.svg?style=flat)](https://travis-ci.org/yury-dymov/redux-object)
[![Coverage Status](https://coveralls.io/repos/github/yury-dymov/redux-object/badge.svg?branch=master)](https://coveralls.io/github/yury-dymov/redux-object?branch=master)

Builds complex JS object from normalized redux store. Best works with [json-api-normalizer](https://github.com/yury-dymov/json-api-normalizer).

DEMO - [https://yury-dymov.github.io/json-api-react-redux-example/](https://yury-dymov.github.io/json-api-react-redux-example/)

Demo sources and description - [https://github.com/yury-dymov/json-api-react-redux-example](https://github.com/yury-dymov/json-api-react-redux-example)

# API
Library provides `build` function, which takes 3 parameters: state part, object type and ID.

```JavaScript
import build from 'redux-object';

/*
state:
{
  data: {
    post: {
      "2620": {
        attributes: {
          "text": "hello",
          "id": 2620
        },
        relationships: {
          daQuestion: {
            id: "295",
            type: "question"
          },
          liker: [{
              id: "1",
              type: "user"
            }, {
              id: "2",
              type: "user",
            }, {
              id: "3",
              type: "user"
            }
          ],
          comments: []
        }
      }
    },
    question: {
      "295": {
        attributes: {
          text: "hello?"
        }
      }
    },
    user: {
      "1": {
        attributes: {
          id: 1,
          name: "Alice"
        }
      },
      "2": {
        attributes: {
          id: 2,
          name: "Bob"
        }
      },
      "3": {
        attributes: {
          id: 3,
          text: "Jenny"
        }
      }
    },
    meta: {
      'posts/me': {
        data: {
          post: '2620'
        }
      }
    }
  }
};
*/

const post = build(state.data, 'post', '2620');

console.log(post.id); // -> 2620
console.log(post.text); // -> hello
console.log(post.daQuestion); // -> { id: 295, text: "hello?" }
console.log(post.liker.length); //-> 3
console.log(post.liker[0]); // -> { id: 1, name: "Alice" }
```

Child objects are lazy loaded.

# License
MIT (c) Yury Dymov
