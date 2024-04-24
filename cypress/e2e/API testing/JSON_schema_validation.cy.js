import {urls as url} from "./API_usefull/Locators";
import {JSON_schema} from "./API_usefull/Schemas";

const Ajv = require('ajv');
const ajv = new Ajv()

describe('Schema validation', () => {

    it('Schema response validation ', () => {

        // обычный GET-запрос
        cy.request({
            method: 'GET',
            url: url.API_url5
            // как обычно переносим ответ в переменную
        }).then((response) => {

            // вносим в переменную нашу схему предварительно обработанную методом avj.compile()
            const validate = ajv.compile(JSON_schema)
            // вносим в переменную итог сравнения схемы и JSON-ответа на наш запрос
            const isvalid = validate(response.body)
            //делаем проверку на ответ true
            expect(isvalid).to.be.true

        })

    });

});