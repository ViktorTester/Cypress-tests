import {demo_qa as dq} from "./Usefull/locators";
import {urls as url} from "./Usefull/locators";

describe('file uploads', () => {

    it('single file upload', () => {
        cy.visit(url.url15)

        // находим локатор кнопки загрузки файла и присоединяем файл
        cy.get(dq.fileUploadBtn).attachFile('CV-LV.pdf')

        //нажимаем на кнопку загрузки
        cy.get(dq.uploadSubmitBtn).click()

        // проверка на сообщение об успешной загрузке
        cy.get(dq.successMsg).should('contain', 'File Uploaded!')

        // проверка на название успешно загруженного файла
        cy.get(dq.uploadedFile).should('contain', 'CV-LV.pdf')
    });

    it('rename the file during upload', () => {
        cy.visit(url.url15)

        // находим локатор кнопки загрузки файла, присоединяем файл и переименовываем его
        cy.get(dq.fileUploadBtn).attachFile({filePath: 'CV-LV.pdf', fileName: "newFileName.pdf"})

        //нажимаем на кнопку загрузки
        cy.get(dq.uploadSubmitBtn).click()

        // проверка на сообщение об успешной загрузке
        cy.get(dq.successMsg).should('contain', 'File Uploaded!')

        // проверка на название успешно загруженного файла
        cy.get(dq.uploadedFile).should('contain', 'newFileName.pdf')
    });

    it('file upload using drag and drop', () => {

        cy.visit(url.url15)
        // нахождение селектора, выбор файла и уточнение, что файл загружается через drag-n-drop
        cy.get(dq.dragDropBox).attachFile('CV-LV.pdf', {subjectType: 'drag-n-drop'})

        // проверка на название загруженного файла
        cy.get(dq.droppedFile).should('contain', 'CV-LV.pdf')

        // проверка на галочку об успешной загрузке
        cy.get(dq.successMark).should('exist')
    });

    it('multiple file upload', () => {

        cy.visit(url.url16)

        // выбор селектора и загрузка сразу нескольких файлов
        cy.get(dq.fileUploadBtn2).attachFile(['CV-LV.pdf', 'new 2.txt'])

        //проверка на текст после успешного добавления файлов
        cy.get(dq.msgToAssert).should('contain', 'Files You Selected:')

        //проверка на текст после успешного добавления файлов
        cy.get(dq.uploadedFiles2).should('contain', 'new 2.txt')

        //проверка на текст после успешного добавления файлов
        cy.get(dq.uploadedFiles1).should('contain', 'CV-LV.pdf')

    });

    it.only('file upload through the shadow DOM', () => {

        cy.visit(url.url17)

        // нахождение селектора и загрузка файла
        cy.get(dq.shadowUploadBtn, {includeShadowDom:true}).attachFile('CV-LV.pdf')

        // проверки на тексты и наличие кнопок после успешной загрузки
        cy.get(dq.shadowUploadedText, {includeShadowDom:true}).should('contain', 'CV-LV.pdf')
        cy.get(dq.shadowThreeButtons, {includeShadowDom:true}).eq(0).should('exist')
        cy.get(dq.shadowThreeButtons, {includeShadowDom:true}).eq(1).should('exist')
        cy.get(dq.shadowThreeButtons, {includeShadowDom:true}).eq(2).should('exist')

    });

});