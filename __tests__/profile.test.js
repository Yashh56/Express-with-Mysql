const request = require("supertest");
const app = require("../index");


describe('GET /profile',()=>{
        test('should return 200 OK and user information if authorized', async() => { 
                const loginResponse = await request(app).post('/auth/login').send({username:"demo02",password:"123456789"})
                const token = loginResponse.body.token;

                const res = await request(app).get('/profile').set('Authorization',`Bearer ${token}`);

                expect(res.status).toBe(200);
                
         })

         test('should return 401 Unauthorized if no token provided', async() => { 
                const res = await request(app).get('/profile')
                expect(res.status).toBe(401)
          })
        test('should return 403 Forbidden if invalid token provided',async()=>{
                const response = await request(app).get('/profile').set('Authorization','Bearer invalidtoken')

                expect(response.status).toBe(403)
        })
})
