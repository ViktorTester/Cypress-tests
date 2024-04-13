import {urls as url} from "./Usefull/locators";
import {demo_qa as dq} from "./Usefull/locators";

describe('browser navigation', () => {

    it('should ', () => {

        cy.visit(url.url10)

        // проверка тайтла сайта на текст
        cy.title().should('eq', 'Your Store')

        //переход в секцию
        cy.get(dq.camerasSection).click()

        //проверка названия секции
        cy.get(dq.camerasTitle)
            .contains('Cameras')
            .should('contain', 'Cameras')

        // имитация нажатия на стрелку "назад"
        cy.go('back') // равнозначно команде cy.go(-1)

        // проверка тайтла сайта на текст
        cy.title().should('eq', 'Your Store')

        // имитация нажатия на стрелку "вперед"
        cy.go('forward') // равнозначно команде cy.go(1)

        //проверка названия секции
        cy.get(dq.camerasTitle)
            .contains('Cameras')
            .should('contain', 'Cameras')

        cy.wait(3000)
        //рефреш страницы
        cy.reload()

    });
});