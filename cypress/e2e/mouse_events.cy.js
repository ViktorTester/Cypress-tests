import {demo_qa as dq} from "./Usefull/locators";
import {urls as url} from "./Usefull/locators";

describe('', () => {
    it('mouseover', () => {

        cy.visit(url.url10)
        // элемент не должен быть видим до наведения, проверяю это

        cy.get('.nav-link').contains('Mac').should('not.be.visible');
        // навести мышку на элемент и кликнуть (нужно обязательно кликнуть,
        // таким образом выполняется имитация наведения)
        cy.get(dq.desktopDropdown).trigger('mouseover').click();

        // проверка элемента на наличие в открывшемся дропдауне
        cy.get('.nav-link').contains('Mac').should('be.visible');
    });

    it('rightclick', () => {
        cy.visit(url.url11)

        // первый вариант
        // Проверка, что опция не видна до совершения клика
        cy.get(dq.pasteOption).should('not.be.visible');

        // выбор элемента и правй клик по нему
        cy.get(dq.rightClickButton).trigger('contextmenu');

        //проверка, что опция видна после клика
        cy.get(dq.pasteOption).should('be.visible');

        // второй вариант
        cy.get(dq.rightClickButton).rightclick();
    });

    it('doubleclick', () => {

        cy.visit(url.url12)

        // согласиться на куки
        cy.get(dq.cookiesYes).click()

        // так как элементы находятся во фрейме, нужно взаимодействовать с ним
        // запуск фрейма
        cy.frameLoaded(dq.frame)

        // проверка того, что второе поле пока пустое
        cy.iframe(dq.frame).find(dq.secondTextField).should('be.empty')

        // сделать даблклик по кнопке
        cy.iframe(dq.frame).find(dq.dblclickButton).trigger('dblclick')

        // в поле ниже должно появиться значение из поля выше, делаем ассерт
        cy.iframe(dq.frame).find(dq.secondTextField).should('have.value', 'Hello World!')

        // второй вариант
        cy.iframe(dq.frame).find(dq.dblclickButton).dblclick()
    });

    it('drag and drop using plugin', () => {
        cy.visit(url.url13)

        // выбрать элемент и указать куда перетащить его
        // в данном случае Cypress ругался, что элемент не видит (хотя он видим),
        // поэтому использовалась опция {force:true}
        cy.get(dq.dragElementRome).drag(dq.dropElementItaly, {force: true})
    });

    it.only('page scrolling', () => {

        cy.visit(url.url14)

        // указываем элемент до которого будет скролиться страница и команду
        // необязательный элемент duration - сколько времени будет
        // скролиться страница пока не дойдет до нужного элемента
        // без него это произойдет мгновенно
        cy.get(dq.educationID).scrollIntoView({duration: 5000})

        // проверка того, что нужный элемент видим
        // эту команду и верхнюю можно соединить в одну, так как у них один селектор
        cy.get(dq.educationID).should('be.visible')


        // теперь скроллим наверх и также проверяем, что элемент видим
        cy.get(dq.latviaID).scrollIntoView({duration: 3000}).should('be.visible')


    });
});