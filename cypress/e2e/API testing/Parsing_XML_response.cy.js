import {urls as url} from "./API_usefull/Locators";
import {xmlPayload} from "./API_usefull/Schemas";

const xml2js = require('xml2js');
const parser = new xml2js.Parser({explicit: false});


// простой тест состоящий из двух шагов - генерируем ID животного,
// затем ищем это животное по ID и валидируем ответ
describe('XML parsing', () => {

    // задаем переменную для получаемого ID животного
    let petId = null

    before("Creating a new pet", () => {
        cy.request({
            method: 'POST',
            url: url.API_url6,
            // передает в теле запроса XML из переменной
            body: xmlPayload,
            // Обратите внимание на тип, это уже не JSON, а XML
            // Для SOAP API возможна передача запроса и получение
            // ответа, только в XML формате.
            headers: {
                // формат передаваемого значения
                'content-type': 'application/xml',
                // формат получаемого значения
                'accept': 'application/xml'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);

            // Нужно получить ID из ответа, но мы не можем вытащить его из
            // XML-кода напрямую, поэтому его нужно сперва запарсить (проанализировать)

            // Преобразуем XMl в JSON. В скобках находятся переменные, в которых
            // будет храниться ошибка (если появится) и результат. Это обязательный синтаксис
            parser.parseString(response.body, (err, result) => {

                // получаем необходимый ID и заносим в ранее созданную переменную.
                petId = result['Pet'].id

                // проверяем значение переменной
                cy.log(petId)

            });
        })

    })

    it('Fetching pet data/Parsing XML response', () => {
        cy.request({
            method: 'GET',
            url: `${url.API_url6}${petId}`,
            headers: {
                'accept': 'application/xml'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);

            parser.parseString(response.body, (err, result) => {

                cy.log(petId);

                // Проверяем необходимые значения
                expect(result['Pet'].name).contain('Jimmy');
                expect(result['Pet'].id).contain(petId.toString());
            })
        })

    });
});
