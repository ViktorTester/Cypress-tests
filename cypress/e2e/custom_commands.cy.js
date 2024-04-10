import {urls as url} from "./Usefull/locators";
import {demo_qa as dq} from "./Usefull/locators";
import {custom_functions_text as cft} from "./Usefull/texts_to_compare";
describe('custom commands', () => {

    it.only('handling links', () => {

        // ниже представлены 2 варианта как найти элемент продкта и кликнуть на него
        // затем проверить его название

        //вариант 1 - стандартный:
        cy.visit(url.url19)
        //найти продукт и кликнуть
        cy.get(dq.productLinkApple).contains(cft[0]).click()
        //найти название и проверить его
        cy.get(dq.productNameApple).should('have.text', cft[0])

        //вариант 2 - используя кастомную команду
        cy.visit(url.url19)
        cy.clickLink(cft[0])
        cy.get(dq.productNameApple).should('have.text', cft[0])

    });

    it('overwriting existing command', () => {

    });

    it('login command', () => {

    });
});