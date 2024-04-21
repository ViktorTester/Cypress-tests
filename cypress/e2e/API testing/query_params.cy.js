describe('query parameters', () => {

    it('Passing query params', () => {

        // можно сразу засунуть парам в переменную
        const queryParam = {page: 2}

        cy.request({
            method: 'GET',
            // подаем адрес без параметра
            url: 'https://reqres.in/api/users',
            // передаем параметр, используя специальный метод
            qs: {page: 2} // либо из переменной queryParam
        }).then((response) => {
            // ниже одна и та же проверка, но написанная по-разному
            // оба варианта работают
            expect(response.status).equal(200);
            expect(response.status).to.eq(200);
            // проверка номера страницы с которой мы получаем ответ,
            // то есть мы передаем страницу 2 и проверяем, что ответ со страницы 2
            expect(response.body.page).to.eq(2)
            // проверка на количество элементов в теле ответа у элемента 'data'
            // в ответе есть массив 'data'и в нем 6 объектов (ключ-значение)
            expect(response.body.data).has.length(6)
            // Проверка конкретных значений конкретного объекта
            // в данном случае осуществляются 2 проверки на значения самого первого
            // объекта в массиве 'data'. Синтаксис 'have' или 'has' не имеет значения
            expect(response.body.data[0]).have.property('id', 7)
            expect(response.body.data[0]).has.property('first_name', 'Michael')
        })

    });
});