import request from 'supertest';
import app from "../../app.js";
import {IUser} from "../interfaces/user";

process.env.NODE_ENV = 'test';
process.env.SKIP_MIDDLEWARE = 'true';

describe("POST /login", () => {
    describe("given a email and password", () => {
        test("should respond with a 200 status code", async () => {
            const response = await request(app).post("/login").send({
                email: "sofija@gmail.com",
                password: "mare"
            })
            expect(response.statusCode).toBe(200)
            expect(response.body.token).toBeDefined()
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
    })
})

describe("POST /user/create", () => {
    describe("create new user", () => {
        test("should respond with a 200 status code, user created", async () => {
            const newUser:IUser = {
                id: 27,
                email: "janko@gmail.com",
                password: "mare",
                key: "123456",
                activity: true,
                roles_id: 1,
                company_id: 1,
                name: "Janko",
                telephone: "123456789"
            }
            const response = await request(app).post("/user/create").send(newUser)

            expect(response.statusCode).toBe(200)

        })
    })
})

describe("POST /user/edit", () => {
    describe("edit user", () => {
        test("should respond with a 200 status code, user edited", async () => {
            const editUser:IUser = {
                id: 27,
                email: "Janko@gmail.com",
                password: "mare",
                key: "123456",
                activity: true,
                roles_id: 1,
                company_id: 1,
                name: "Janko",
                telephone: "123456789"
            }
            const response = await request(app).post("/user/edit").send(editUser)
            expect(response.statusCode).toBe(200)
        })
    })
})



afterAll(() => {
    process.env.NODE_ENV = 'development';
    process.env.SKIP_MIDDLEWARE = 'false';
});