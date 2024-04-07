describe('Some kind of test', () => {

    // запустить приложение (1 раз)
    before(() => {
        cy.log("open app")
    })

    it('search', () => {
        cy.log("searching")
    });

    it('advanced search', () => {
        cy.log("advanced searching")

    });

    it('listing products', () => {
        cy.log("listing products")

    });

    // закрыть приложение (1 раз)
    after(() => {
        cy.log("close app")
    })
});

describe('Some kind of test 2', () => {

    // залогиниться перед каждым тестом
    beforeEach(() => {
        cy.log("log on")
    })

    // разлогиниться после каждого теста
    afterEach(() => {
        cy.log("log off")
    })

    it('search', () => {
        cy.log("searching")
    });

    it('advanced search', () => {
        cy.log("advanced searching")

    });

    it('listing products', () => {
        cy.log("listing products")

    });

});