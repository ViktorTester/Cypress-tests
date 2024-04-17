import {urls as url} from "./API_usefull/Locators";

describe('HTTP request', () => {

    it('GET Call', () => {

        // обычный GET запрос с проверкой на статус кода ответа
        // Для такого реквеста мы не передаем параметры,
        // а только получаем информацию, не меняя ее
        cy.request('GET', url.API_url1)
            .its('status')
            .should('eq', 200);
    });

    it('POST Call', () => {
        // POST запрос с проверкой на статус кода ответа
        // Тут мы передаем параметры, так как
        // изменяем информацию посредством запроса
        cy.request({
            method: 'POST',
            url: url.API_url2,
            body: {
                title: "Test post",
                body: "This is a post call",
                userId: 1
            }
        })
            .its('status')
            .should('eq', 201);
    });

    it('PUT Call', () => {
        // PUT запрос с проверкой на статус кода ответа
        // Тут мы передаем параметры, так как
        // изменяем информацию посредством запроса
        cy.request({
            method: 'PUT',
            url: url.API_url1,
            body: 'This is a put call',
            userId: 1,
            id: 1
        })
            .its('status')
            .should('eq', 200);
    })

    it('DELETE Call', () => {

        // DELETE запрос с проверкой на статус кода ответа
        // Для такого реквеста мы не передаем параметры,
        // а только удаляем информацию, не добавляя новой
        cy.request('DELETE', url.API_url1)
            .its('status')
            .should('eq', 200);
    })
});
