import {urls as url} from "./Usefull/locators";
import {demo_qa as dq} from "./Usefull/locators";

describe('fixtures', () => {

    // обращение к файлу с данными напрямую
    it('direct access', () => {
        cy.visit(url.url18)

        // вызывается команда, указывающая путь к файлу с данными
        // затем в тесте происходит обращение уже напрямую к строкам из файла
        cy.fixture('testdata').then((data) => {
            cy.get(dq.loginUsername).type(data.username);
            cy.get(dq.loginPassword).type(data.password);
            cy.get(dq.submitBtn).click();
            cy.get(dq.headerDashboard).should('have.text', data.expected);
        })

    });

    // до блока 'it' настраивается хук и переменная для него
    let userdata;
    before(() => {
        cy.fixture('testdata').then((data) => {
            userdata=data;
        })
    })

    // обращение к файлу с данными через хук
    // затем в каждом блоке 'it', находящимся под данным хуком,
    // можно обращаться к строкам из файла
    it('access the data through the hook', () => {

        cy.visit(url.url18)
        cy.get(dq.loginUsername).type(userdata.username);
        cy.get(dq.loginPassword).type(userdata.password);
        cy.get(dq.submitBtn).click();
        cy.get(dq.headerDashboard).should('have.text', userdata.expected);

    });
});