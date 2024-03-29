import {demo_qa as dq} from "./Usefull/locators";
import {urls as u} from "./Usefull/locators";

describe("Handling dropdowns", () => {

    it('dropdown with select', () => {
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

    it('dynamic dropdowns', () => {
        // динамический дропдаун на примере гугла - инпут поле открывает дропдаун,
        // давай рандомные подсказки по мере заполнения поля

        cy.visit(u.url4)

        // согласиться на куки
        cy.get(dq.cookiesAccept).contains('Piekrist').click()

        // найти инпут и вписать туда значение
        cy.get(dq.googleInput).type('autotests')

        // задержка для того, чтобы сервер успел предоставить все автоподсказки
        // это не происходит мгновенно
        cy.wait(2000)

        // найти общий элемент для всех автоподсказок и сравнить их количество с ожидаемым
        // в данном случае гугл подсовывает 10 элементов, но общий локатор есть у 13.
        // это не совсем объективно, но не смог найти общий локатор для 10 элементов
        cy.get(dq.googleSuggest).should('have.length', 13)

        // тут скрипт перебирает все автоподсказки и ищет в них искомый текст
        // waitForAnimations: false добавлено специально, так как иначе падала ошибка о том
        // Если скрипт находит текст, он кликает по элементу с ним
        cy.get(dq.googleSuggest).each(($el) => {
            if ($el.text() === 'autotests qa') {
                cy.wrap($el).click({ waitForAnimations: false })
            }
        // вместо скрипта можно использовать и проверку из прошлого теста
        // cy.get(dq.suggestTitle).contains('Latvian mythology').click()
        // Однако подсказки каждый раз разные и лучше будет использовать скрипт
        })
        // вынужденная задержка, так как скрипт делал проверку до того как браузер открывал
        // следующую страницу. По факту этого можно избежать делая более точные локаторы
        cy.wait(2000)

        // проверка, что после клика и перехода на новую страницу в поисковике остался изначальный текст
        cy.get(dq.googleInput).should('have.value', 'autotests qa')
    })
})