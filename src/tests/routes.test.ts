import request from 'supertest';
import app from '../app'; // Ajusta la ruta según tu estructura de proyecto
import users from '../data/users.json';
import rooms from '../data/RoomData.json';
import comments from '../data/CommentsData.json'; // Asegúrate de que esta ruta sea correcta

describe('Routes to GET all elements Json with authorization', () => {
  let cookie: string | null = null;

  beforeAll(async () => {
    const loginRes = await request(app)
      .post('/login')
      .send({
        email: "adw@gmail.com", 
        password: "1234"
      });
    
    if (loginRes.headers['set-cookie']) {
      cookie = loginRes.headers['set-cookie'];
    } else {
      throw new Error('No se recibió la cookie de autenticación');
    }
  });

  // Verificar que no se puede acceder sin estar logueado
  it('should return 401 for accessing rooms without authorization', async () => {
    const res = await request(app)
      .get('/rooms');

    expect(res.status).toBe(401);
  });

  it('should return 401 for accessing users without authorization', async () => {
    const res = await request(app)
      .get('/users');

    expect(res.status).toBe(401);
  });

  it('should return 401 for accessing comments without authorization', async () => {
    const res = await request(app)
      .get('/comments');

    expect(res.status).toBe(401);
  });

  // Verificar que se puede acceder estando logueado
  it('should return a Json with rooms trying to get all Rooms when logged in', async () => {
    const res = await request(app)
      .get('/rooms')
      .set('Cookie', cookie as string);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(rooms); 
  });

  it('should return a Json with users trying to get all Users when logged in', async () => {
    const res = await request(app)
      .get('/users')
      .set('Cookie', cookie as string);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(users); 
  });

  it('should return a Json with comments trying to get all Comments when logged in', async () => {
    const res = await request(app)
      .get('/comments')
      .set('Cookie', cookie as string);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(comments); 
  });

  // Verificar acceso a elementos específicos
  it('should return a Json with a specific user when logged in', async () => {
    const res = await request(app)
      .get(`/users/${users[0].id}`) // Ajusta el campo de ID según tus datos
      .set('Cookie', cookie as string);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(users[0]); 
  });

  it('should return a Json with a specific comment when logged in', async () => {
    const res = await request(app)
      .get(`/comments/${comments[0].id}`) // Ajusta el campo de ID según tus datos
      .set('Cookie', cookie as string);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(comments[0]); 
  });

  it('should return a Json with a specific room when logged in', async () => {
    const res = await request(app)
      .get(`/rooms/${rooms[0].id}`) // Ajusta el campo de ID según tus datos
      .set('Cookie', cookie as string);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(rooms[0]); 
  });

  // Verificar que no se puede acceder a elementos específicos sin estar logueado
  it('should return 401 for trying to get a specific room without authorization', async () => {
    const res = await request(app).get(`/rooms/${rooms[0].id}`);
    expect(res.status).toBe(401);
  });

  it('should return 401 for trying to get a specific user without authorization', async () => {
    const res = await request(app).get(`/users/${users[0].id}`);
    expect(res.status).toBe(401);
  });

  it('should return 401 for trying to get a specific comment without authorization', async () => {
    const res = await request(app).get(`/comments/${comments[0].id}`);
    expect(res.status).toBe(401);
  });
});
