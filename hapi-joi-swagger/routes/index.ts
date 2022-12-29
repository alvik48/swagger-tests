import { ServerRoute } from '@hapi/hapi';

const routes: ServerRoute[] = [];

import users from './users';

const sources = [
  users
];

for (let i = 0, ilen = sources.length; i < ilen; ++i) {
  for (let j = 0, jlen = sources[i].length; j < jlen; ++j) {
    routes.push({
      method: String(sources[i][j][0]),
      path: String(sources[i][j][1]),
      options: Object.assign({
        notes: [],
        plugins: {
          'hapi-swagger': {
            payloadType: 'form'
          }
        }
      }, sources[i][j][2])
    });
  }
}

export default routes;
