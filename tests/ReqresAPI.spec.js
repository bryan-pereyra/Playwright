const { test, expect } = require('@playwright/test');
const baseUrl = 'https://reqres.in/api/users'

test.describe('Reqres API Tests', () => {
    test('GET Method', async ({ request }) => {
        const response = await request.get(`${baseUrl}?page=2`, {
        });
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toEqual(200);
        console.log(await response.json());
    });

    test('POST Method', async ({ request }) => {
        const response = await request.post(`${baseUrl}`, {
            data: {
                name: "User",
                job: "SDET"
            }
        });
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toEqual(201);
        console.log(await response.json());
    });

    test('PUT Method', async ({ request }) => {
        const response = await request.put(`${baseUrl}/2`, {
            data: {
                name: "Tester",
                job: "Test Lead"
            }
        });
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toEqual(200);
        console.log(await response.json());
    });

    test('DELETE Method', async ({ request }) => {
        const response = await request.delete(`${baseUrl}/2`, {
        });
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toEqual(204);
    });
});
