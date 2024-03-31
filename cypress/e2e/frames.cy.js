import {demo_qa as dq} from "./Usefull/locators";
import {urls as url} from "./Usefull/locators";

describe('iFrames', () => {

    it('1st method', () => {

        cy.visit(url.url8)

        // таким образом получаем доступ к документу (куда вводится текст фрейма)
        // 0 в данном случае - это индекс документы. Один документ, значит 0 индекс
        // и заносим его в переменную
        // Также проводится проверка на его видимость
        const iframe = cy.get(dq.iFrameId)
            .its('0.contentDocument.body')
            .should('be.visible')
            .then(cy.wrap)

        // стираем из поля весь находящийся там по умолчанию текст
        // записываем туда свой текст, а также выделяем его
        // cmd+a - для мака, ctrl+a - для винды
        iframe.clear().type('Hello there {cmd+a}')

        // проверка вписанного значения (старое должно удалиться, новое остаться)
        iframe.should('contain', 'Hello there')

        // клик по кнопке Bold, заранее выделенный текст становится жирным
        cy.get(dq.boldButton).click()

    });

    it('2nd method - custom command', () => {

        cy.visit(url.url8)

        // Используя кастомный метод, можно сделать то же самое, что и в первом случае,
        // но код будет уже без повторений.
        // Также проводится проверка на его видимость
        cy.getIframe(dq.iFrameId)
            .clear()  // стираем из поля весь находящийся там по умолчанию текст
            .type('Hello there {cmd+a}') // записываем туда свой текст, а также выделяем его
            .should('contain', 'Hello there') // проверка вписанного значения

        // клик по кнопке Bold, заранее выделенный текст становится жирным
        cy.get(dq.boldButton).click()

    });

    it('3nd method - iFrame plugin', () => {

        cy.visit(url.url8)

        // команда находит и запускает фрейм
        cy.frameLoaded(dq.iFrameId)

        // команда работает с инпут-полем фрейма
        cy.iframe(dq.iFrameId)
            .clear()  // стираем из поля весь находящийся там по умолчанию текст
            .type('Hello there {cmd+a}')  // записываем туда свой текст, а также выделяем его
            .should('contain', 'Hello there')  // проверка вписанного значения


    });
});