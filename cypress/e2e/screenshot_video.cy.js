import {urls as url} from "./Usefull/locators";
import {demo_qa as dq} from "./Usefull/locators";

describe('capturing screenshots and video', () => {
    it('manual screenshot capturing', () => {
        cy.visit(url.url10)

        // будет сделан скриншот
        cy.screenshot('my-screenshot');

        //переход в секцию
        cy.get(dq.camerasSection).click()

        //переход по селектору и скриншот этого элемента
        cy.get(dq.camerasTitle)
            .contains('Cameras')
            .screenshot('cameras')
    });

    it.only('screenshot and video on fail scenario', () => {

        cy.visit(url.url10)

        //переход в секцию
        cy.get(dq.camerasSection).click()

        //переход по селектору и скриншот этого элемента
        cy.get(dq.camerasTitle)
            .contains('Cameras')
            .should('contain', 'tameras')

        // В данном коде специальна была сделана опечатка в слове, чтобы ассерт н сработал
        // и тест упал. Зато в папке screenshots появился этот запечатленный момент
        // Тест был запущен через терминал

    });
});