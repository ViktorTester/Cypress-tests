import {urls as url} from "./Usefull/locators";
import {demo_qa as dq} from "./Usefull/locators";

describe('Chiled tabs', () => {

    it('removing the "target" element', () => {

        // переход на родительскую вкладку
        cy.visit(url.url6)

        // выбор элемента в котором находится атрибут target, его удаление и клик по нему
        // ссылка откроется не в новом окне, а в текущем
        cy.get(dq.clickButton)
            .invoke('removeAttr', 'target')
            .click();

        //проверка того, что открывшееся окно имеет нужный url
        cy.url().should('eq', url.url7)

        // возвращение на предыдущую вкладку (родительскую)
        cy.go('back');

        // проверка того, что мы вернулись в предыдущее окно
        cy.url().should('eq', url.url6)
    });

    it('using direct link', () => {

        // переход на родительскую вкладку
        cy.visit(url.url6)

        //получаем значение href-атрибута и переносим его в переменную 'url_test'
        cy.get(dq.clickButton).then((e) => {
            let url_test = e.prop('href');
            cy.visit(url_test)
        })

        //проверка того, что открывшееся окно имеет нужный url
        cy.url().should('eq', url.url7)

        // возвращение на предыдущую вкладку (родительскую)
        cy.go('back');

        // проверка того, что мы вернулись в предыдущее окно
        cy.url().should('eq', url.url6)

    });
});