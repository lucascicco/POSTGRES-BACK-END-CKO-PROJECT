/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import request from 'supertest';
import app from '../../src/app';
import truncate from '../util/truncate';

describe('Location', () => {
  let token;

  beforeAll(async () => {
    await truncate()

    await request(app)
        .post('/users')
        .send({
          name: 'Testing Account Up',
          email: 'testing@hotmail.com',
          password: '123456'
        }).then((response) => {
          expect(response.body).toHaveProperty('token')

          token = response.body.token
        })
  });

  it('Should be able to create a location', async () => {
    const response = await request(app).post('/location').send({
        country: "Brazil",
        state: "SP",
        city: "SP",
        neighborhood: "Jd.Santa Santana",
        street: "Rua Pedro Moraes de Alameda",
        street_number: "274",
        postcode: "07096080"
    }).set('Authorization', `Bearer ${token}`)


    expect(response.status).toBe(200)
  });
});
