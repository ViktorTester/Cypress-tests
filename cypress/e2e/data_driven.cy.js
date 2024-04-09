import {urls as url} from "./Usefull/locators";
import {demo_qa as dq} from "./Usefull/locators";

describe('data-driven testing', () => {

    // данный тест будет проведен трижды, каждый раз подставляя новые данные для логина

    it('should ', () => {
        // помещаем содержимое файла в переменную data
        cy.fixture("datadriven").then((data) => {

            // заходим на сайт каждый раз в цикле (трижды)
            cy.visit(url.url18)

            // перебираем каждый элемент (из всего 3 элементов в файле)
            // и заносим в переменную userdata
            data.forEach((userdata) => {

                // теперь применяем шаги к каждому элементу, а по факту
                // подставляем данные из элемента в шаги столько раз,
                // сколько элементов в файле, то есть 3 раза
                cy.get(dq.loginUsername).type(userdata.username);
                cy.get(dq.loginPassword).type(userdata.password);
                cy.get(dq.submitBtn).click();

                //проверка данного элемента возможно только если пользователь зайдет внутрь сайта
                if (userdata.username === 'Admin' && userdata.password === 'admin123') {
                    cy.get(dq.headerDashboard).should('have.text', userdata.expected);

                    // в случае успешного логина, нужно после проверки выйти на главную страницу,
                    // чтобы проводить дальнейшие проверки (сделать logout)
                    cy.get(dq.profileArrow).click()
                    cy.get(dq.logoutButton).contains('Logout').click()
                } else {

                    // если же он вводит неверные данные, то будет проверять элемент с
                    // главной страницы сайта, для которого вход не нужен.
                    cy.get(dq.invalidCreds).should('have.text', userdata.expected)
                }
            })
        })
    });
});