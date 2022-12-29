import Joi from 'joi'
import express from 'express'
const app = express();

type TUser = {
  id: number,
  name: string
};

const TUserJoi = Joi.object({
  id: Joi.number().integer().positive().required(),
  name: Joi.string().required()
});

const Users: TUser[] = [{ id: 1, name: 'Alex' }, { id: 2, name: 'Not Alex' }];

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get users list
 *     parameters:
 *      - name: take
 *        in: query
 *        schema:
 *          type: number
 *      - name: skip
 *        in: query
 *        schema:
 *          type: number
 *      - name: orderBy
 *        in: query
 *        schema:
 *          type: string
 *      - name: order
 *        in: query
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Users list
 */

app.get('/users', (req, res) => {
  res.send(JSON.stringify(Users));
});

app.post('/users', (req, res) => {
  const schema = Joi.object().keys({
    name: Joi.string().alphanum().min(3).max(30).required()
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const newUser: TUser = {
    id: Users.length,
    name: String(req.body.name)
  };

  Users.push(newUser);

  // create user in database
  res.send(JSON.stringify({
    status: 'OK',
    data: newUser
  }));
});
