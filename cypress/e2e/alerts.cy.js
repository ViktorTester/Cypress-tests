import {demo_qa as dq} from "./Usefull/locators";
import {urls as url} from "./Usefull/locators";
import {alert_texts as at} from "./Usefull/texts_to_compare";

let name = 'Viktor'

describe('alerts', () => {
    it('simple alerts', () => {

        cy.visit(url.url)

        // закрыть окно "принять куки"
        cy.get(dq.cookies_consent).contains('Consent').click()

        // выбрать раздел с алертами
        cy.get(dq.alerts).click()

        // найти локатор кнопки вызова алерта и кликнуть
        cy.get(dq.simpleAlert).click()

        // вызывается евент и проводится проверка на текст внутри алерта
        // окно с алертом автоматически закрывается после проверки
        cy.on('window:alert', (t) => {
            expect(t).to.contains(at[0]);
        })
    });

    it('confirm alerts', () => {
        cy.visit(url.url)
        // закрыть окно "принять куки"
        cy.get(dq.cookies_consent).contains('Consent').click()

        // выбрать раздел с алертами
        cy.get(dq.alerts).click()

        cy.get(dq.confirmAlert).click()

        // вызывается евент и проводится проверка на текст внутри алерта
        // окно с алертом автоматически закрывается после проверки (ok - нажимается по дефолту)
        // равнозначно команде - cy.on('window:confirm', () => true);
        cy.on('window:confirm', (t) => {
            expect(t).to.contains(at[1]);
        })

        // закрыть окно с алертом выбрав 'cancel'
        cy.on('window:confirm', () => false);
    });

    it('prompt alerts', () => {
        cy.visit(url.url)
        // закрыть окно "принять куки"
        cy.get(dq.cookies_consent).contains('Consent').click()

        // выбрать раздел с алертами
        cy.get(dq.alerts).click()

        //евент с инпут текстом нужно вызывать ДО клика на алерт
        // тут мы передаем текст в алерт
        cy.window().then((win) => {
            cy.stub(win, 'prompt').returns(name)
        })

        cy.get(dq.promptAlert).click()

        // вызывается евент и проводится проверка на текст внутри алерта
        cy.on('window:confirm', (t) => {
            expect(t).to.contains(at[2]);
        })

        // после того как текст введен и подтвержден, происходит проверка на
        // поле с текстом, появляющиеся после нажатия 'ok'
        cy.get(dq.nameText).should('have.text', `Your name is: ${name}`)
    });

    it.only('modern alerts', () => {

        cy.visit(url.url)
        // закрыть окно "принять куки"
        cy.get(dq.cookies_consent).contains('Consent').click()

        // выбрать раздел с алертами
        cy.get(dq.alerts).click()

        // кликнуть на кнопку триггера алерта
        cy.get(dq.modernAlert).click()

        // найти селекктор кнопки закрытия (крестик) и кликнуть
        cy.get(dq.moderAlertClose).click()
    });

    it('auth alerts', () => {

        //Для алерта базовой аутентификации параметры можно передать в метод в JSON формате
        // Затем Cypress сам нажмет на ок' в алерте
        cy.visit(url.url5, {auth: {username: 'admin', password: 'admin'}})

        //либо другой вариант - передать креды прямо в URL
        cy.visit(url.url5_adm)

        // когда аутентификация пройдена успешна, нужно сверить текст на странице
        cy.get(dq.textAfterBasicAuth)
            .should('contain', at[3])
            .and('contain', at[4])

    });
});