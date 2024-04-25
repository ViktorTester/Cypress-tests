import {urls as url} from "./API_usefull/Locators";

describe('API Authentications', () => {

    // Обыкновенная базовая аутентификация
    it('Basic auth', () => {

        cy.request({
            method: 'GET',
            url: url.API_url7,
            // Для базовой аутентификации нужно указать опцию auth
            auth: {
                // ключевое слово user
                user: 'postman',
                // ключевое слово pass
                pass: 'password'
            }
        }).then((response) => {
            expect(response.status).equal(200)
            expect(response.body['authenticated']).to.eq(true)
        })

    });

    it('Bearer token', () => {

        // Сохраняем токен в переменную
        const token = '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'

        cy.request({
            method: 'GET',
            url: url.API_url8,
            // Токен нужно передавать в хедерах используя ключевое слово
            headers: {
                // Authorization - ключевое слово, также мы передаем не просто токен,
                // а Bearer token. Поэтому нужно добавить слово 'Bearer'
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            expect(response.status).equal(200)
            expect(response.body[0]['name']).to.eq('Cypress-tests')
        })

    });

    it('API key', () => {

        cy.request({
            method: 'GET',
            url: url.API_url8,
            qs: {
                appid: 'testappid12344322', // ключ и значение
                q: 'Delhi' // Название города
            }
        }).then((response) => {
            expect(response.status).equal(200)
        })
    })
})