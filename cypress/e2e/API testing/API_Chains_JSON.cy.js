import {urls as url} from "./API_usefull/Locators";

// Задаем переменную, в которой сохраним номер поста из первого запроса.
let post_Id

describe('API Chaining', () => {


    // Сперва получаем все записи с помощью GET-запроса
    it('Getting all the posts/Getting a certain post', () => {
        cy.request({
            method: 'GET',
            url: url.API_url10
        })
            .then((response) => {
                expect(response.status).to.eq(200);
                // сохраняем значение в переменную
                post_Id = response.body[1].id;
                return post_Id
            })
            .then((post_Id) => {
                // передаем post_Id в следующий запрос как query param
                cy.request({
                    method: 'GET',
                    url: url.API_url11,
                    qs: {
                        postId: post_Id
                    }
                })
                    .then((response) => {
                        // проводим стандартную валидацию
                        expect(response.status).to.eq(200);
                        expect(response.body).to.have.length(5);
                    })
            })
    });
});