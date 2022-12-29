import { readdirSync } from 'fs';
import { ServerRoute } from '@hapi/hapi'

const routes: ServerRoute[] = [];

const directories = readdirSync(__dirname, { withFileTypes: true })
  .filter(dir => dir.isDirectory() && dir.name[0] !== '_')
  .map(dir => dir.name);

for (let i = 0, ilen = directories.length; i < ilen; ++i) {
  const directoryRoutes = require(`${__dirname}/${directories[i]}`);

  for (let j = 0, jlen = directoryRoutes.length; j < jlen; ++j) {
    routes.push({
      method: directoryRoutes[j][0],
      path: directoryRoutes[j][1],
      options: Object.assign({
        notes: [],
        plugins: {
          'hapi-swagger': {
            payloadType: 'form'
          }
        }
      }, directoryRoutes[j][2])
    });
  }
}

export default routes;
