import {urls as url} from "./API_usefull/Locators";

describe('OAuth 2.0', () => {

    // Данные полученные из предварительно настроенной OAuth-аппликации.
    // Для тестов такую аппликацию можно создать например через GitHub
    const clientID = 'test'
    const clientSecret = 'test'
    const authCode = 'test'
    let accessToken = ''


    // https://github.com/login/oauth/authorize?client_id=test
    // Строка выше - это адрес, по которому нужно перейти, чтобы получить authCode. Он
    // находится в URL, появляющийся при переходе по адресу выше. В него мы
    // передаем наш clientID. Этот код постоянно обновляется и его время жизни кончается.
    // Поэтому в реальных тестах, нужно организовывать запрос, постоянно обновляющий authCode для тестов


    it('Getting OAuth2.0 access token', () => {

        cy.request({
            method: 'POST',
            url: url.API_url9,
            qs: {
                // В запросе передаем заранее полученные ID/Секрет/Код
                client_id: clientID,
                client_secret: clientSecret,
                code: authCode,
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            // Извлечь из ответа токен, как обычно, не получится, так как ответ
            // приходит (в данном случае) не в JSON-формате, а просто как строка текста, в которую
            // включено и название токена, и сам токен.

            // Извлекаем токен из строки с помощью метода .split() и индексации
            const params = response.body.split('&')
            accessToken = params[0].split('=')[1]
        })
    })

    it('OAth 2.0 request', () => {

        cy.request({
            method: 'GET',
            url: url.API_url8,
            headers: {
                // передаем токен полученные из предыдущего POST-запроса
                Authorization: `Bearer ${accessToken}`
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body[0]['name']).to.eq('Cypress-tests')
        })
    });
});