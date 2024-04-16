
// несмотря на то, что два одинаковых названия у класса локаторов и функций,
// они функционируют корректно
class LoginClass {

    userName = "input[placeholder='Username']";
    password = "input[placeholder='Password']";
    submitBtn = "button[type='submit']";
    titleMsg = '.oxd-topbar-header-breadcrumb > .oxd-text';

    //ввод логина
    setUserName(username) {
        cy.get(this.userName).type(username);
    }

    // ввод пароля
    setPassword(pass) {
        cy.get(this.password).type(pass);
    }

    // клик по кнопке логина
    clickSubmit() {
        cy.get(this.submitBtn).click();
    }

    // проверка текста на открывшейся странице
    verifyLogin() {
        cy.get(this.titleMsg)
            .should('have.text', 'Dashboard');
    }

}

export default LoginClass;