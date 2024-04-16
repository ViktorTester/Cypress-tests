import Login from "../PageObjects/LoginPage.js";

describe('page model object', () => {

    it('general approach', () => {

        // тест без модели page object
        // все элементы теста находятся тут же, в одном файле
        cy.visit('https://opensource-demo.orangehrmlive.com/');
        cy.get("input[placeholder='Username']").type('Admin');
        cy.get("input[placeholder='Password']").type('admin123');
        cy.get("button[type='submit']").click();
        cy.get('.oxd-topbar-header-breadcrumb > .oxd-text').should('have.text', 'Dashboard');

    });

    it('pom approach', () => {

        const ln = new Login();

        cy.visit('https://opensource-demo.orangehrmlive.com/');

        //тест с моделью page object
        ln.setUserName('Admin')
        ln.setPassword('admin123')
        ln.clickSubmit()
        ln.verifyLogin()

    });

    it('pom approach with fixtures', () => {

        const ln = new Login();

        cy.visit('https://opensource-demo.orangehrmlive.com/');

        cy.fixture('testdata').then((data) => {

            //тест с моделью page object
            ln.setUserName(data.username)
            ln.setPassword(data.password)
            ln.clickSubmit()
            ln.verifyLogin()

        })
    });
});