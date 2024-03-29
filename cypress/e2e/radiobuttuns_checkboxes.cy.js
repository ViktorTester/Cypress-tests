import {demo_qa as dq} from "./Usefull/locators";
import {urls as u} from "./Usefull/locators";


describe('Check UI elements', () => {

    it('Checking radiobuttons', () => {
        // переход на страницу
        cy.visit(u.url)

        // закрыть окно "принять куки"
        cy.get(dq.cookies_consent).contains('Consent').click()

        // выбрать раздел с radiobuttons & checkboxes
        cy.get(dq.radiobtns).click()

        // проверка, что кнопка видна
        cy.get(dq.radio_nobug)
            .should('be.visible')

        // проверка, что кнопка задизейблена и видна
        cy.get(dq.radio_mb)
            .should('be.disabled')
            .and('be.visible')

        // нажать первую радио-кнопку и проверить, что она нажата
        cy.get(dq.radio_yes).check()
            .should('be.checked')

        // нажать вторую радио-кнопку и проверить, что она нажата
        cy.get(dq.radio_no).check()
            .should('be.checked')

        // проверить, что после нажатия второй кнопки, первая уже не нажата
        cy.get(dq.radio_yes)
            .should('not.be.checked')


    })

    it('Checking checkboxes', () => {

        // выбор чекбоксов по одному

        // переход на страницу
        cy.visit(url)

        // закрыть окно "принять куки"
        cy.get(dq.cookies_consent).contains('Consent').click()

        // выбрать раздел с radiobuttons & checkboxes
        cy.get(dq.radiobtns).click()

        // проверка, что чекбокс1 виден. Так как не удалось получить прямой селектор
        // чекбокса, пришлось использовать текст расположенный в следующей HTML строке
        cy.contains('label.checkbox', 'I agree to the')
            .find(dq.cbox).should('be.visible')

        // нажать чекбокс1 и проверить, что он нажат.
        cy.contains('label.checkbox', 'I agree to the')
            .find(dq.cbox)
            .check().should('be.checked');

        // отжать чекбокс1 и проверить, что он не нажат
        cy.contains('label.checkbox', 'I agree to the')
            .find(dq.cbox)
            .uncheck().should('not.be.checked');

        // чекбокс2 изначально находится на странице в нажатом состоянии, поэтому проверка
        // на то, что он нажат и затем команда отжать его и проверка, что он отжат
        cy.contains('label.checkbox', 'Remember me')
            .find(dq.cbox).should('be.checked')
            .uncheck().should('not.be.checked');


        // выбор сразу всех чекбоксов

        // нужно найти селектор общий сразу для всех чекбоксов, затем нажать и проверить, что нажато
        // И команда нажатия, и проверка распространяется на все элементы с одним селектором
        cy.get(dq.all_cbox)
            .check().should('be.checked')

        // отжать и проверить, что не нажато
        // И команда нажатия, и проверка распространяется на все элементы с одним селектором
        cy.get(dq.all_cbox)
            .uncheck().should('not.be.checked')


        // выбор первого или последнего чекбокса

        // выбор селектора общего для всех чекбоксов и уточнение, что нужен первый из них
        // Нажатие и проверка, что он нажат. Затем отжатие и проверка, что не нажат
        cy.get(dq.all_cbox).first()
            .check().should('be.checked')
            .uncheck().should('not.be.checked')


        // выбор селектора общего для всех чекбоксов и уточнение, что нужен последний из них
        // Нажатие и проверка, что он нажат. Затем отжатие и проверка, что не нажат
        cy.get(dq.all_cbox).last()
            .check().should('be.checked')
            .uncheck().should('not.be.checked')


    })
})