const request = require("supertest");
const app = require("../index");

describe("POST ,/auth/register", () => {
  describe("given a username and password", () => {
    test("should respond with a 201 status code", async () => {
      const response = await request(app).post("/auth/register").send({
        username: "test",
        email: "test.com",
        password: "test",
      });
      expect(response.statusCode).toBe(201);
    });
    test('should return 403 Invalid Email',async () => { 
      const res = await request(app).post('/auth/register').send({
        email:"",
        username:"demo00",
        password:"1233342324"
      })
      expect(res.statusCode).toBe(403)
     })
    test('should return 403 Invalid Username',async () => { 
      const res = await request(app).post('/auth/register').send({
        email:"demo022@gmail.com",
        username:"",
        password:"1233342324"
      })
      expect(res.statusCode).toBe(403)
     })
  
    test("should return 403  Invalid Password",async()=>{
      const res = await request(app).post('/auth/register').send({
        email:"demo022@gmail.com",
        username:"demo02",
        password:""  
      })
      expect(res.statusCode).toBe(403)
    }) 
  });
});

describe("POST /auth/login", () => {
  test("Successful Login", async () => {

    const res = await request(app).post('/auth/login').send({
        username:"demo02",
        password:"123456789"
    });
    expect(res.statusCode).toBe(200)  
  });

  test('should return 403 Error No Username is passed',async () => { 
    const res = await request(app).post('/auth/login').send({
      username:"",
      password:"1233342324"
    })
    expect(res.statusCode).toBe(401)
   })

  test("should return 403 Error No Password is passed ",async()=>{
    const res = await request(app).post('/auth/login').send({
      username:"demo02",
      password:""  
    })
    expect(res.statusCode).toBe(403)
  }) 



});
