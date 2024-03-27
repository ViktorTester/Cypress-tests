import {demo_qa as dq} from "./Locators/locators";
import {urls as u} from "./Locators/locators";
describe('alerts', () => {
    it.only('simple alerts', () => {

        cy.visit(u.url)

        // закрыть окно "принять куки"
        cy.get(dq.cookies_consent).contains('Consent').click()


        // выбрать раздел с алертами
        cy.get(dq.alerts).click()

        // найти локатор кнопки вызова алерта и кликнуть
        cy.get(dq.simpleAlert).click()

        // вызывается евент и проводится проверка на текст внутри алерта
        // окно с алертом автоматически закрывается после проверки
        cy.on('window:alert', (t) => {
            expect(t).to.contains('Hey! Welcome to LetCode');
        })


        
    });

    it('confirm alerts', () => {
        //cy.get(dq.confirmAlert).click()
    });

    it('prompt alerts', () => {
        //cy.get(dq.promptAlert).click()
    });

    it('modern alerts', () => {
        //cy.get(dq.modernAlert).click()
    });
});