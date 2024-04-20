import {urls as url} from "./API_usefull/Locators";

describe('api testing', () => {

    it('1st method - hard-coded json-object', () => {

        // создаем json-объект со статичными значениями
        const requestBody = {
            tourist_name: "Mike",
            tourist_email: "Mike@example.com",
            tourist_location: "Paris"
        }

        //делаем запрос
        cy.request({
            method: "POST",
            url: url.API_url2,
            body: requestBody
            //затем выносим тело ответа в переменную
        }).then((response) => {
            // проводим проверки
            expect(response.status).to.eq(201);
            expect(response.body.tourist_name).to.eq("Mike");
            expect(response.body.tourist_email).to.eq("Mike@example.com");
            expect(response.body.tourist_location).to.eq("Paris");
        })
    });

    it('2nd method - dynamically generating json-object', () => {

        // создаем json-объект с динамическими значениями
        const requestBody = {

            // каждый раз создаются разные данные
            tourist_name: Math.random().toString(5).substring(2),
            tourist_email: Math.random().toString(5).substring(2) + "@example.com",
            tourist_location: "Paris"
        }

        //делаем запрос
        cy.request({
            method: "POST",
            url: url.API_url2,
            body: requestBody
            //затем выносим тело ответа в переменную
        }).then((response) => {
            // проводим проверки уже со случайными данными, созданными ранее
            expect(response.status).to.eq(201);
            expect(response.body.tourist_name).to.eq(requestBody.tourist_name);
            expect(response.body.tourist_email).to.eq(requestBody.tourist_email);
            expect(response.body.tourist_location).to.eq("Paris");
        })
    });

    it.only('3rd method - using fixture', () => {

        // вызываем фикстуру и заносит ее данные в переменную
        cy.fixture('tourist').then((data) => {

            //делаем запрос
            cy.request({
                method: "POST",
                url: url.API_url2,
                body: data
                //затем выносим тело ответа в переменную
            }).then((response) => {
                // проводим проверки используя данные из фикстуры
                expect(response.status).to.eq(201);
                expect(response.body.tourist_name).to.eq(data.tourist_name);
                expect(response.body.tourist_email).to.eq(data.tourist_email);
                expect(response.body.tourist_location).to.eq(data.tourist_location);

                //проверка получаем ли мы в ответе конкретный ключ и сравниваем его значение
                expect(response.body).has.property("tourist_name", data.tourist_name);
                // та же проверка, что и выше, но написанная иначе
                expect(response.body).to.have.property("tourist_email", data.tourist_email);
            })
        })
    })
});