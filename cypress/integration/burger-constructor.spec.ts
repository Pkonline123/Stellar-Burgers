import {
   ingredientClass, closeButtonClass,
   tabClass, burgerConstructorContainerClass,
   burgerConstructorItemClass
} from "../../src/utils/test-constants";

describe('service is available', function () {
   beforeEach(() => {
      cy.viewport(1920, 1024);
   });

   it('should be available localhost:3000', function () {
      cy.visit('/')
      cy.contains('Соберите бургер')
   });

   it('should open ingredient details', function () {
      cy.visit('/')
      cy.wait(1000);
      cy.get(ingredientClass).first().click()
      cy.contains('Детали ингредиента')
   });

   it('should close ingredient details by button', function () {
      cy.visit('/')
      cy.get(ingredientClass).first().click()
      cy.get(closeButtonClass).first().click();
      cy.visit('/');
   });

   it('should tab', function () {
      cy.visit('/')
      cy.get(tabClass).last().click();
      cy.wait(1000).get(tabClass).first().click();
   })

   it('should scroll', function () {
      cy.visit('/')
      cy.get('[class^=burger-ingredients_scroll').scrollTo(0, 500).wait(1000)
      cy.get(tabClass).last().click()
   });

   it('should dragndrop ingredients and set bun and drag constructor and delete item open order number', function () {
      cy.visit('/')

      cy.get(ingredientClass).as('ingredients');
      cy.get(burgerConstructorContainerClass).as('constructorContainer');
      cy.get('@ingredients').eq(0).drag('@constructorContainer');
      cy.get('@ingredients').eq(4).drag('@constructorContainer');
      cy.get('@ingredients').eq(1).drag('@constructorContainer');
      cy.get('@ingredients').eq(7).drag('@constructorContainer');
      cy.get('@ingredients').eq(11).drag('@constructorContainer');
      cy.get('@ingredients').eq(4).drag('@constructorContainer');
      cy.get('@ingredients').eq(0).drag('@constructorContainer');

      cy.get(burgerConstructorItemClass).as('constructorItems');
      cy.get('@constructorItems').eq(0).drag('@constructorItems');
      cy.get('@constructorItems').eq(1).drag('@constructorItems');


      cy.get('[class^=constructor-element__action]').eq(2).click()

      cy.contains('Оформить заказ').click()

   })

   it('should authorization and order number', function () {
      cy.visit('/login')
      const email = 'zachitaylov-l2@yandex.ru';
      const password = '12345678';
      cy.get('input').first().type(email)
      cy.get('input').last().type(password)
      cy.get('button').click();

      cy.get(ingredientClass).as('ingredients');
      cy.get(burgerConstructorContainerClass).as('constructorContainer');

      cy.get('@ingredients').eq(0).drag('@constructorContainer');
      cy.get('@ingredients').eq(4).drag('@constructorContainer');
      cy.get('@ingredients').eq(1).drag('@constructorContainer');
      cy.get('@ingredients').eq(7).drag('@constructorContainer');
      cy.get('@ingredients').eq(11).drag('@constructorContainer');
      cy.get('@ingredients').eq(4).drag('@constructorContainer');
      cy.get('@ingredients').eq(0).drag('@constructorContainer');

      cy.intercept('POST', '/api/orders').as('postOrder');
      cy.wait(1000).contains('Оформить заказ').click()
      cy.wait('@postOrder').its('response.statusCode').should('eq', 200);

      cy.wait(2000).get('[class^=order-details_identifiredOrderNumber]').and('exist')
      cy.get(closeButtonClass).click();

   })
})