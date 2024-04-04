import {demo_qa as dq} from "./Usefull/locators";
import {urls as url} from "./Usefull/locators";
import {table_texts as tt} from "./Usefull/texts_to_compare";


describe('handling tables', () => {

    // hook - выполняется перед каждым блоком it
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
            .each(($row, index, $rows) => {
                cy.wrap($row).within(() => {
                    cy.get('td').each(($col, index, $cols) => {
                        cy.log($col.text()); // публикация значения ячейки в консоль
                        cy.wrap($col).should('not.be.empty'); // проверка на то, что ячейка не пуста
                    })
                })
            })
    });

    it('pagination', () => {
        // вычисление общего количества страниц
        let totalPages
        // сперва находим локатор и заносим из него текст в переменную
        cy.get(dq.totalPages).then((e) => {
            let mytext = e.text(); // Showing 1 to 10 of 19013 (1902 Pages) - текст в переменной
            // Теперь нужно найти две скобки и вычислить число между ними
            // способ такой, потому-как это число динамическое
            totalPages = mytext.substring(mytext.indexOf('(') + 1, mytext.indexOf('Pages') - 1);

            //создаем цикл для поочередного клика по каждой странице
            for (let p = 1; p <= totalPages; p++) {
                if (totalPages > 1) {
                    // выводим страницу на которой находимся
                    cy.log('active page is ' + p);
                    // делаем клик по странице, с каждой итерацией увеличивая счетчик на 1
                    cy.get(dq.pageNumber).contains(p).click();
                    // небольшая задержка, чтобы ознакомиться с содержимым страницы
                    cy.wait(3000)

                    // Далее можно с каждой страницы получать информацию для сравнения
                    // данный цикл пробегает по 3 колонке таблицы, в которой находится почта, и
                    // выводит эту почту в интерфейс. По факту можно каждую такую колонку асертить
                    cy.get(dq.tableRow)
                        .each(($row) => {
                            cy.wrap($row).within(() => {
                                cy.get('td:nth-child(3)').then((e) => {
                                    cy.log(e.text())
                                })
                            })
                        })
                }

            }

        })
    })
})