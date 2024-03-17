describe('XPathLocators', () => {
    it('find product count', () => {

        cy.visit("http://atomationpractice.com/index.php")
        cy.xpath('//ul[@id="homefeatured"]/li'.should('have.length', 7))
        // cy.xpath('//ul[@id="homefeatured"]').xpath("./li").should('have.length', 7)) - цепной XPath

        // переход на страницу
        // нахождение списка элементов и проверка количества элементов (в этом списке) на странице, фактически это assert
    })
})