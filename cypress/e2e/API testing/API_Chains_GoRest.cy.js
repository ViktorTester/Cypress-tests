import {urls as url} from "./API_usefull/Locators";

// В данном тесте происходят:
// 1) регистрация нового пользователя
// 2) Изменения данных этого пользователя
// 2) Удаление этого пользователя

// Задаем переменную, в которой сохраним ID из первого запроса.
let user_id

describe('API Chains GoRest', () => {

    const auth_token = 'fba29289db1d815f98130bd4a9c46574db5cb6f109a97396be68ad00df4b8efb'

    it('create, update and delete the user', () => {
        // Создание нового пользователя
        cy.request({
            method: 'POST',
            url: url.API_url12,
            body: {
                name: 'JorgeTom',
                gender: 'male',
                email: Math.random().toString(5).substring(2) + '@gmail.com',
                status: 'active'

            },
            headers: {
                Authorization: 'Bearer ' + auth_token
            }
        })
            .then((response) => {
                expect(response.status).to.eql(201)
                // сохраняем значение в переменную
                user_id = response.body.id

                cy.request({
                    method: 'PUT',
                    // передаем user_id в url
                    url: `${url.API_url12}${user_id}`,
                    // изменяем имя конкретного пользователя
                    body: {
                        name: 'Scott'
                    },
                    headers: {
                        Authorization: 'Bearer ' + auth_token
                    }
                })
                    .then((response) => {
                        // Проверяем изменилось ли имя, а также код ответа
                        expect(response.status).to.eql(200)
                        expect(response.body['name']).to.eq('Scott')

                        // Удаляем пользователя
                        cy.request({
                            method: 'DELETE',
                            url: `${url.API_url12}${user_id}`,
                            headers: {
                                Authorization: 'Bearer ' + auth_token
                            }
                        })
                            .then((response) => {
                                // Проверяем, что пользователь удален
                                expect(response.status).to.eql(204)

                            })
                    })
            })


    });

});