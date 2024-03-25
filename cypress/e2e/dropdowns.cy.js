import {demo_qa as dq} from "./Locators/locators";
import {urls as u} from "./Locators/locators";

describe("Handling dropdowns", () => {

    it.skip('dropdown with select', () => {
        // речь о дропдаунах, имеющих select id, то есть по сути у
        // них есть ID, к которому можно привязаться

        cy.visit(u.url)

        // закрыть окно "принять куки"
        cy.get(dq.cookies_consent).contains('Consent').click()

        // переход на страницу дропдаунов
        cy.get(dq.dropdowns).click()

        // открытие дропдауна, выбор значения и проверка, что фактическое значение
        // соответствует выбранному
        cy.get(dq.selectFruit)
            .select('Banana')
            .should('have.value', '3')

    })

    it('dropdown without select', () => {
        // речь о bootstrap-дропдаунах, не имеющих тега - Select

        cy.visit(u.url2)

        // находим локатор дропдауна любым способом и кликаем, дропдаун открывается
        cy.get(dq.selectCountry).click()

        // в открытом дропдауне есть инпут поле, находим его локатор, Вписываем значение
        // и нажимаем enter, как и происходит в реальности
        cy.get(dq.inputCountry).type('Lat').type('{enter}')

        // в поле уже вписалось и сохранилось значение, осталось только найти селектор дропдауна
        // и проверить на содержащийся в нем текст
        cy.get(dq.selectCountry).should('have.text', 'Latvia')

    })

    it('auto-suggestion dropdowns', () => {
        // выглядит это так - есть инпут поле куда надо вписать значение. По мере написания текста,
        // появляется дропдаун, который подсказывает наиболее близкие варианты. Эти варианты
        // всегда статичны и зависят он вписываемого теста

        cy.visit(u.url3)
        // нахождение инпут поля и ввод значения
        cy.get(dq.searchInput).type("Latvia")

        // считаем количество подсказок (по количеству элементов с одним классом)
        cy.get(dq.suggestText).should('have.length', '6')

        // Проверка, что среди подсказок есть определенная, и кликаем на нее
        cy.get(dq.suggestTitle).contains('Latvian mythology').click()

    })

    it.only('dynamic dropdowns', () => {
        // динамический дропдаун на примере гугла - инпут поле открывает дропдаун,
        // давай рандомные подсказки по мере заполнения поля

        cy.visit(u.url4)

    })
})