//

describe("CSSLocators", () => {

    it("csslocators", () => {

        cy.visit("http://atomationpractice.com/index.php")
        cy.get("#search_query_top").type("T-Shirts")           //ID locator
        // cy.get(".search_query").type("T-Shirts")                         //class locator
        // cy.get("[name='search_query']").type("T-Shirts")                 //attribute locator
        // cy.get(".search_query[name='search_query']").type("T-Shirts")    //class attribute locator
        cy.get("[name='submit_search']").click                      //attribute locator
        cy.get(".lighter").contains("T-Shirt")              //class locator

        // переход на страницу
        // нахождение поиска и вставка туда значения
        // клик по кнопке подтверждения поиска
        // верификация текста после осуществления поиска, фактически это assert

    })
})