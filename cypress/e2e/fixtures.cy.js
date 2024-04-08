import {urls as url} from "./Usefull/locators";
import {demo_qa as dq} from "./Usefull/locators";

describe('fixtures', () => {

    it('direct access', () => {
        cy.visit(url.url18)

        cy.fixture('testdata').then((data) => {
            cy.get(dq.loginUsername).type(data.username);
            cy.get(dq.loginPassword).type(data.password);
            cy.get(dq.submitBtn).click();
            cy.get(dq.headerDashboard).should('have.text', data.expected);
        })

    });

    it('access the data throught the hook', () => {

    });
});