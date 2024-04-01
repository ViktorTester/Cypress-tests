import {demo_qa as dq} from "./Usefull/locators";
import {urls as url} from "./Usefull/locators";
import {table_texts as tt} from "./Usefull/texts_to_compare";


describe('handling tables', () => {

    // hook - выполняется перед каждый блоком it
    beforeEach('Login', () => {
        // переход на сайт, логин и закрытие алерта
        cy.visit(url.url9)
        cy.get(dq.login).type('demo')
        cy.get(dq.password).type('demo')
        cy.get(dq.loginButton).click()
        cy.get(dq.closeAlert).click()

        //переход в раздел с таблицами
        cy.get(dq.customersMainMenu).click()
        cy.get(dq.custumersSubMenu).click()
    })

    it('check number of rows and columns', () => {

        // поиск селектора строки и проверка на их количество,
        // количество селекторов = количество строк
        cy.get(dq.tableRow).should('have.length', '10')

        // то же самое, но с колонками
        cy.get(dq.tableColumns).should('have.length', '7')
    });

    //
    it('check cell data from specific row or column', () => {
        // нужно извлечь значение из 2 столбца-5 колонки
        // пишем соответствующий локатор, в котором есть значеник как
        // столбца, так и колонки
        cy.get(dq.tableValue).contains(tt[0])
    });

    it('read data from the all table first page rows and columns', () => {

        // запись ниже является фактически вложенной функцией, которая пробегает по всех
        // столбцам и строкам в таблице (на странице)
         cy.get(dq.tableRow)
             .each( ($row, index, $rows) => {
                 cy.wrap($row).within( () => {
                     cy.get('td').each(($col, index, $cols) => {
                         cy.log($col.text()); // публикация значения ячейки в консоль
                         cy.wrap($col).should('not.be.empty'); // проверка на то, что ячейка не пуста
                     })
                 })
             })
    });

    it.only('pagination', () => {

    });
});