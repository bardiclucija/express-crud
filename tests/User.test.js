const supertest = require('supertest');
const app = require('../web');

const valid_user_id = "a57e40fb-b4aa-4763-93cd-c7147ced6732";
const invalid_user_id = "af888a80-06a5-43dc-bb90-959652e39321";

afterAll((done) => {
    app.close(done);
  });

describe('Show', () => {
    test('Valid request', async () => {
        const response = await supertest(app).get(`/api/users/${valid_user_id}`).expect(200);
        expect(response.status).toBe(200);
    });

    test('Invalid request', async () => {
        const response = await supertest(app).get(`/api/users/${invalid_user_id}`).expect(404);

        expect(response.status).toBe(404);
    });
});

describe('Create', () => {
    test('First name cannot be empty', async () => {
        const user = {
            email: "email@example.com",
            first_name: "",
            last_name: "Lastname",
            password: "pass123212"
        }
        const response = await supertest(app).post(`/api/users`).send(user);

        expect(response.status).toBe(422);
        expect(response.body.errors[0].msg).toBe(
            "First name is required"
        );
    });

    test('Last name cannot be empty', async () => {
        const user = {
            email: "email@example.com",
            first_name: "Firstname",
            last_name: "",
            password: "pass123212"
        }
        const response = await supertest(app).post(`/api/users`).send(user);

        expect(response.status).toBe(422);
        expect(response.body.errors[0].msg).toBe(
            "Last name is required"
        );
    });

    test('Invalid email address', async () => {
        const user = {
            email: "example.com",
            first_name: "Firstname",
            last_name: "Lastname",
            password: "pass123212"
        }
        const response = await supertest(app).post(`/api/users`).send(user);

        expect(response.status).toBe(422);
        expect(response.body.errors[0].msg).toBe(
            "Invalid email address"
        );
    });

    test('Password too short', async () => {
        const user = {
            email: "email@example.com",
            first_name: "Firstname",
            last_name: "Lastname",
            password: "pass1"
        }
        const response = await supertest(app).post(`/api/users`).send(user);

        expect(response.status).toBe(422);
        expect(response.body.errors[0].msg).toBe(
            "Password must be at least 6 characters"
        );
    });
});

describe('Update', () => {
    test('First name cannot be empty', async () => {
        const user = {
            email: "email@example.com",
            first_name: "",
            last_name: "Lastname",
            password: "pass123212"
        }
        const response = await supertest(app).put(`/api/users/${valid_user_id}`).send(user);

        expect(response.status).toBe(422);
        expect(response.body.errors[0].msg).toBe(
            "First name is required"
        );
    });

    test('Last name cannot be empty', async () => {
        const user = {
            email: "email@example.com",
            first_name: "Firstname",
            last_name: "",
            password: "pass123212"
        }
        const response = await supertest(app).put(`/api/users/${valid_user_id}`).send(user);

        expect(response.status).toBe(422);
        expect(response.body.errors[0].msg).toBe(
            "Last name is required"
        );
    });

    test('Invalid email address', async () => {
        const user = {
            email: "example.com",
            first_name: "Firstname",
            last_name: "Lastname",
            password: "pass123212"
        }
        const response = await supertest(app).put(`/api/users/${valid_user_id}`).send(user);

        expect(response.status).toBe(422);
        expect(response.body.errors[0].msg).toBe(
            "Invalid email address"
        );
    });

    test('Invalid user ID', async () => {
        const response = await supertest(app).put(`/api/users/${invalid_user_id}`).expect(404);
        expect(response.status).toBe(404);
    });
});

describe('Delete', () => {
    test('Invalid request', async () => {
        const response = await supertest(app).delete(`/api/users/${invalid_user_id}`).expect(500);
        expect(response.status).toBe(500);
    });
});