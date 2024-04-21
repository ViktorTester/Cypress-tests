import {urls as url} from "./API_usefull/Locators";

describe('Headers and Cookies', () => {

    // создаем переменную, куда позже поместим токен
    let authToken = null

    // создаем хук, чтобы перед тестами заполучить токен
    before('creating access token', () => {
        cy.request({
            method: 'POST',
            url: url.API_url3,
            // передаем хедеры с помощью специального метода
            headers: {'Content-Type': 'application/json'},
            body: {
                clientName: 'tester',
                // генерирует рандомный е-мейл каждый раз
                clientEmail: Math.random().toString(5).substring(2) + "@gmail.com"
            }
            //затем фиксируем полученный токен в переменной для дальнейшего использования
        }).then((response) => {
            authToken = response.body['accessToken']
        })
    })

    // еще один хук для размещения заказа
    before('creating new order using a token', () => {
        cy.request({
            method: 'POST',
            url: url.API_url4,
            // передаем хедеры с помощью специального метода, но в этот раз
            // также указываем токен, полученный ранее
            // Также нужно указать слово 'Bearer', так как передается токен
            // именно таким образом
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            //передаем уже другие данные для оформления заказа
            body: {
                'bookId': 1,
                'customerName': 'tester1'
            }
        }).then((response) => {
            // проводим валидацию
            expect(response.status).to.eq(201);
            expect(response.body['created']).to.eq(true)
        })
    })


    // После выполнения хуков у нас есть токен, а также размещенный заказ
    // теперь можно проверить, что наш заказ присутствует в общем списке заказов
    it('fetching the orders', () => {

        cy.request({
            method: 'GET',
            url: url.API_url4,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            cookies: {
                'cookieName': 'mycookie'

            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).have.length(1);
        })

    });

})

