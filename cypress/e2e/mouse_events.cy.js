import {demo_qa as dq} from "./Usefull/locators";
import {urls as url} from "./Usefull/locators";
import {table_texts as tt} from "./Usefull/texts_to_compare";
describe('', () => {
    it('mouseover', () => {

        cy.visit(url.url10)
        // элемент не должен быть видим до наведения, проверяю это

        cy.get('.nav-link').contains('Mac').should('not.be.visible');
        // навести мышку на элемент и кликнуть (нужно обязательно кликнуть,
        // таким образом выполняется имитация наведения)
        cy.get(dq.desktopDropdown).trigger('mouseover').click();

        // проверка элемента на наличие в открывшемся дропдауне
        cy.get('.nav-link').contains('Mac').should('be.visible');
    });

    it('rightclick', () => {
        cy.visit(url.url11)

        // первый вариант
        // Проверка, что опция не видна до совершения клика
        cy.get(dq.pasteOption).should('not.be.visible');

        // выбор элемента и правй клик по нему
        cy.get(dq.rightClickButton).trigger('contextmenu');

        //проверка, что опция видна после клика
        cy.get(dq.pasteOption).should('be.visible');

        // второй вариант
        cy.get(dq.rightClickButton).rightclick();
    });

    it.only('doubleclick', () => {

        cy.visit(url.url12)

        // согласиться на куки
        cy.get(dq.cookiesYes).click()

        // так как элементы находятся во фрейме, нужно взаимодействовать с ним
        // запуск фрейма
        cy.get(dq.frame).frameLoaded
        cy.iframe(dq.frame).find(dq.dblclickButton).trigger('dblclick')
        //cy.iframe(dq.dblclickButton).trigger('dblclick')


        // // cy.get(dq.secondTextField).should('not.contain', 'Hello World!')
    });

    it('drag and drop using plugin', () => {

    });
    it('page scrolling', () => {

    });
});