import { Request, ResponseToolkit } from '@hapi/hapi';
import * as Joi from 'joi';

type TUser = {
  id: number,
  name: string
};

const TUserJoi = Joi.object({
  id: Joi.number().integer().positive().required(),
  name: Joi.string().required()
});

const Users: TUser[] = [{ id: 1, name: 'Alex' }, { id: 2, name: 'Not Alex' }];

export default [

  ['GET', '/users', {
    description: 'Get users list',
    tags: ['api', 'users'],
    handler(r: Request, h: ResponseToolkit) {
      return h.response(Users);
    },
    validate: {
      query: Joi.object({
        take: Joi.number().integer().positive().max(1000).default(100).description('How much users to return'),
        skip: Joi.number().integer().min(0).default(0).description('How much users to skip (for pagination)'),
        orderBy: Joi.string().valid('id', 'name').description('Field to order by'),
        order: Joi.string().valid('asc', 'desc').description('Order direction')
      })
    },
    response: {
      schema: Joi.array().items(TUserJoi)
    }
  }],

  ['GET', '/users/{id}', {
    description: 'Get user by id',
    tags: ['api', 'users'],
    handler(r: Request, h: ResponseToolkit) {
      return h.response(Users[r.params.id]);
    },
    validate: {
      params: Joi.object({
        id: Joi.number().integer().positive().description('User id').required()
      })
    },
    response: {
      schema: TUserJoi
    }
  }],

  ['POST', '/users', {
    description: 'Add new user',
    tags: ['api', 'users'],
    handler(r: Request, h: ResponseToolkit) {
      const data = r.payload as TUser;

      Users.push({
        id: Users.length,
        name: String(data.name)
      });

      return h.response({ status: 'OK' });
    },
    validate: {
      payload: Joi.object({
        name: Joi.string().description('User name').required()
      })
    },
    response: {
      schema: Joi.object({
        status: Joi.string().valid('OK')
      })
    }
  }]
];
