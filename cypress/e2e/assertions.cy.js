describe ("Assertions demo", () => {
    it("Implicit assertions", () => {

        cy.visit("https://opensource-demo.orangehrmlive.com//web/index.php/auth/login")
        cy.url().should('include', 'orangehrmlive.com')
        // считать текущий url и проверить есть ли в нем строка
        cy.url().should('eq', 'https://opensource-demo.orangehrmlive.com//web/index.php/auth/login')
        // считать текущий url и проверить что он в точности совпадает с url в заданной строке
        cy.url().should('contain', 'orangehrmlive')
        // считать текущий url и проверить есть ли в нем строка, то же, что и include

        // не обязательно считывать url каждый раз если проверки идут
        // подряд без перехода на другую страницу, есть такой вариант:

        cy.url()
            .should('include', 'orangehrmlive.com')
            .should('eq', 'https://opensource-demo.orangehrmlive.com//web/index.php/auth/login')
            .should('contain', 'orangehrmlive')

        // еще один вариант - вместо того чтобы использовать .should три раза, можно
        // следующие после первого .should заменить на .and:

        cy.url()
            .should('include', 'orangehrmlive.com')
            .and('eq', 'https://opensource-demo.orangehrmlive.com//web/index.php/auth/login')
            .and('contain', 'orangehrmlive')
            .and('not.eq', 'https://www.youtube.com') // негативное ожидание
            .and('not.contain', 'greenhrmlive') // негативное ожидание
            .and('not.include', 'greenhrmlive.com') // негативное ожидание


        // с помощью команды ниже можно сделать проверки по тайтлу сайта,
        // тайтл сайта находится в <head> => <title>Google</title>

        cy.title()
            .should('include', 'Orange')
            .and('eq', "OrangeHRM")
            .and('contain', 'HRM')


        cy.get('.orangehrm-login-branding > img').should('be.visible')
        cy.get('.orangehrm-login-branding > img').should('exist')
        // равнозначные проверки на то, видим ли элемент (существует ли). В данном
        // случае проверяется наличие лого на странице сайта

        //либо:
        cy.get('.orangehrm-login-branding > img')
            .should('be.visible')
            .and('exist')


        //еще одна проверка на количество ссылок на странице. Ссылки имеют тег <a,
        //поэтому можно посчитать количество таких тегов на странице
        cy.xpath('//a').should('have.length', '5') // ожидаю, что на странице 5 ссылок


        cy.get("input[placeholder='Username']").type("Admin")
        //находим инпут поле и вставляем туда значение
        cy.get("input[placeholder='Username']").should("have.value", "Admin")
        //находим инпут поле куда только что вставили значение и проверяем есть ли оно там

    })
})


describe ("Assertions demo", () => {
    it("Explicit assertions", () => {

        cy.visit("https://opensource-demo.orangehrmlive.com//web/index.php/auth/login")
        // переход на страницу
        cy.get("input[placeholder='Username']").type("Admin")
        // поиск инпут поля и ввод логина
        cy.get("input[placeholder='Password']").type("admin123")
        // поиск инпут поля и ввод пароля
        cy.get("button[type='submit']".click())
        cy.get("button[type='submit']".click())
        // поиск кнопки сабмит и клик по ней

        //в этот момент происходит логин и переход на другую страницу

        let expectedName = 'xyz'
        // создаем переменную с ожидаемым результатом

        cy.get(".oxd-userdropdown-name").then( (x) =>{
            // находим локатор для значения которое хотим проверить
            // затем создаем функцию и переносим значение в переменную х
            let actualName = x.text()
            // создаем переменную с фактическим результатом, куда переносим вытащенное значение из прошлого шага

            // BDD style
            expect(actualName).to.equal(expectedName)
            // проверка того, что фактическое значение переменной соответствуют ожидаемому
            expect(actualName).to.not.equal(expectedName)
            // проверка того, что фактическое значение переменной не соответствуют ожидаемому

            //TDD style
            assert.equal(actualName, expectedName)
            // проверка того, что фактическое значение переменной соответствуют ожидаемому
            assert.notEqual(actualName, expectedName)
            // проверка того, что фактическое значение переменной не соответствуют ожидаемому
        })
    })
})
