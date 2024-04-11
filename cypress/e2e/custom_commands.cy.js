import {urls as url} from "./Usefull/locators";
import {demo_qa as dq} from "./Usefull/locators";
import {custom_functions_text as cft} from "./Usefull/texts_to_compare";
describe('custom commands', () => {

    it('handling links', () => {

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
        // перезапись существующей команды на примере команды .contains()
        cy.visit(url.url19)

        // Передается верный текст, но капсом.
        // Такой текст не подойдет при выборе уникального селектора,
        // так как такого текста попросту нет в коде.

        // Однако кастомная функция .clickLink() использует перезаписанную
        // функцию .contains(), которая не смотрит на капитализацию
        cy.clickLink(cft[1])
        // Поэтому такой тест пройдет успешно

        //найти название и проверить его
        cy.get(dq.productNameApple).should('have.text', cft[0])


    });

    it.only('login command', () => {
        // если нужно тестить сайт, то много где используется одно и тое действие -
        // переход на сайт и логин. Чтобы не делать это много раз, можно написать кастомную
        // команду и вызывать ее при необходимости

        // переход на сайт
        cy.visit(url.url19)

        // поиск кнопки логина и клик на нее
        cy.clickLink(cft[2])

        // кастомная команда находит кнопку логина,
        // вводит данные и делает проверку на текст
        cy.loginapp("testing@gmail.com","test123")

    });
});