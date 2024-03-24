import { automationpractice_locators as loc } from "./Locators/locators";

describe("CSSLocators", () => {

    it("csslocators", () => {

        cy.visit("http://automationpractice.com/index.php")
        cy.get(loc.search_button).type("T-Shirts")           //ID locator
        // cy.get(".search_query").type("T-Shirts")                         //class locator
        // cy.get("[name='search_query']").type("T-Shirts")                 //attribute locator
        // cy.get(".search_query[name='search_query']").type("T-Shirts")    //class attribute locator
        cy.get(loc.submit_button).click                      //attribute locator
        cy.get(loc.common).contains("T-Shirt")              //class locator

        // переход на страницу
        // нахождение поиска и вставка туда значения
        // клик по кнопке подтверждения поиска
        // верификация текста после осуществления поиска, фактически это assert

    })
})