/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import request from 'supertest';
import app from '../../src/app';

describe('PersonalInformation', () => {
  let token;

  beforeAll(async () => {

   await request(app)
        .post('/users')
        .send({
          name: 'Testing Account Up',
          email: 'testing_two@hotmail.com',
          password: '123456'
        }).then((response) => {
          expect(response.body).toHaveProperty('token')
          token = response.body.token
        })
  });

  it('Should be able to create a personal info', async () => {
    const response = await request(app).post('/personal_data').send({
      birthday: "2000-01-18T00:00:00.000Z",
      gender: "masculino",
      identification: "256.644.884-45",
      profession: "professor",
      cellphone: "11947052134"
    }).set('Authorization', `Bearer ${token}`)


    expect(response.status).toBe(200)
  });
});
