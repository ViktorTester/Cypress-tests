import {demo_qa as dq} from '/Users/aggro/WebstormProjects/Initial/cypress/e2e/Usefull/locators.js';
import {custom_functions_text as cft} from '/Users/aggro/WebstormProjects/Initial/cypress/e2e/Usefull/texts_to_compare.js';
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/// <reference types="Cypress" />
/// <reference types="cypress-xpath" />

Cypress.Commands.add('getIframe', (iframe) => {
    cy.get(iframe)
        .its('0.contentDocument.body')
        .should('be.visible')
        .then(cy.wrap);
})

// кастомная команда для перехода по ссылке используя label (linked text)
Cypress.Commands.add('clickLink', (label) => {
    // команда ищет элемент по тексту, ориентируясь на класс (а)
    // элемент с таким классом и таким текстом только один.
    cy.get('a').contains(label).click();
})

// Перезапись команды .contains()
// Теперь команда .contains() не смотрит на то большая буква, или маленькая подается в строку.
// Она в любом случае найдет результат
Cypress.Commands.overwriteQuery(
    "contains",
    function (contains, filter, text, userOptions = {}) {
        if (Cypress._.isRegExp(text)) {
            // .contains(filter, text)
            // Do nothing
        } else if (Cypress._.isObject(text)) {
            // .contains(text, userOptions)
            userOptions = text
            text = filter
            filter = ''
        } else if (Cypress._.isUndefined(text)) {
            // .contains(text)
            text = filter
            filter = ''
        }

        userOptions.matchCase = false;

        let contains0 = contains.bind(this)    // this line fixes the error

        return contains0(filter, text, userOptions)
    }
)

// а тут уже созданная с нуля функция, повторяющая действия перезаписанной функции .contains(), но в данном случае,
// не перезаписывающаяя ее. Соответственно у нас есть две рабочие функции - одна смотрит на капитализацию (кастомная),
// а другая - нет. Так можно сделать если нужно сохранить оригинальный метод.
Cypress.Commands.add('customContains', { prevSubject: true }, (subject, text, options = {}) => {
    options.matchCase = false;
    return cy.wrap(subject).contains(text, options);
});

// кастомная команда для логина
Cypress.Commands.add('loginapp', (email, password) => {
    cy.get(dq.loginEmail).type(email)
    cy.get(dq.loginPass).type(password)
    cy.get(dq.loginBtn).click()
    cy.get(dq.msgError).should('contain', cft[3])
})
