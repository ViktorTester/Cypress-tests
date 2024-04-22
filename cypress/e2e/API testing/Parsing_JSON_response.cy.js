import {urls as url} from "./API_usefull/Locators";
import {texts as txt} from "./API_usefull/Texts";

describe('Parsing JSON response', () => {

    it('simple JSON response', () => {

        cy.request({
            method: 'GET',
            url: url.API_url5,
        }).then((response) => {

            // проверка элементов в теле самого первого блока
            expect(response.status).to.eq(200);
            expect(response.body[0]['id']).to.eq(1);
            expect(response.body[0]['title']).to.eq(txt.txt1);
            expect(response.body[0]['price']).to.eq(109.95);
            expect(response.body[0]['rating']['rate']).to.eq(3.9);

            // проверка элементов в теле 20-го блока
            expect(response.status).to.eq(200);
            expect(response.body[19]['id']).to.eq(20);
            expect(response.body[19]['title']).to.eq(txt.txt2);
            expect(response.body[19]['price']).to.eq(12.99);
            expect(response.body[19]['rating']['rate']).to.eq(3.6);

        });
    })

    it('complex JSON response', () => {
        // данный тест получает информацию о неких продуктах, затем обращается к
        // цене каждого продукта, складывает их и проводит проверку

        // задаем переменную в которой будет накапливаться общая цена товара
        let totalprice = 0

        cy.request({
            method: 'GET',
            url: url.API_url5,
            // передаем парам, ограничивая записи в JSON-ответе 5-ю блоками
            qs: {limit: 5}
        }).then((response) => {
            expect(response.status).to.eq(200);

            // создаем цикл, перебирающий только цену каждого блока
            response.body.forEach(element => {
                totalprice += element['price']
            })
            // сверяем ожидаемую сумму с действительной
            expect(totalprice).to.eq(899.23);

        });

    });
})