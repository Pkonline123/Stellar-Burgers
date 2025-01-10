

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
      cy.get('[class*=burgerIngredientItem]').first().click()
      cy.contains('Детали ингредиента')
   });

   it('should close ingredient details by button', function () {
      cy.visit('/')
      cy.get('[class*=burgerIngredientItem]').first().click()
      cy.get('[class*=closeButton]').first().click();
      cy.visit('/');
   });

   it('should tab', function () {
      cy.visit('/')
      cy.get('[class^=tab]').last().click();
      cy.wait(1000).get('[class^=tab]').first().click();
   })

   it('should scroll', function () {
      cy.visit('/')
      cy.get('[class^=burger-ingredients_scroll').scrollTo(0, 500).wait(1000)
      cy.get('[class^=tab]').last().click()
   });

   it('should dragndrop ingredients and set bun and drag constructor and delete item open order number', function () {
      cy.visit('/')
      cy.get('[class*=burgerIngredientItem]').eq(0).drag('[class*=burger-constructor-item_containerConstructor]');
      cy.get('[class*=burgerIngredientItem]').eq(4).drag('[class*=burger-constructor-item_containerConstructor]');
      cy.get('[class*=burgerIngredientItem]').eq(1).drag('[class*=burger-constructor-item_containerConstructor]');
      cy.get('[class*=burgerIngredientItem]').eq(7).drag('[class*=burger-constructor-item_containerConstructor]');
      cy.get('[class*=burgerIngredientItem]').eq(11).drag('[class*=burger-constructor-item_containerConstructor]');
      cy.get('[class*=burgerIngredientItem]').eq(4).drag('[class*=burger-constructor-item_containerConstructor]');
      cy.get('[class*=burgerIngredientItem]').eq(0).drag('[class*=burger-constructor-item_containerConstructor]');

      cy.get('[class*=constructorItem]').eq(0)
         .drag('[class*=constructorItem]')
      cy.get('[class*=constructorItem]').eq(1)
         .drag('[class*=constructorItem]')

      cy.get('[class^=constructor-element__action]').eq(2).click()

      cy.get('button').contains('Оформить заказ').click()
   })

   it('should authorization and order number', function () {
      cy.visit('/login')
      const email = 'zachitaylov-l2@yandex.ru';
      const password = '12345678';
      cy.get('input').first().type(email)
      cy.get('input').last().type(password)
      cy.get('button').click();

      cy.get('[class*=burgerIngredientItem]').eq(0).drag('[class*=burger-constructor-item_containerConstructor]');
      cy.get('[class*=burgerIngredientItem]').eq(4).drag('[class*=burger-constructor-item_containerConstructor]');
      cy.get('[class*=burgerIngredientItem]').eq(1).drag('[class*=burger-constructor-item_containerConstructor]');
      cy.get('[class*=burgerIngredientItem]').eq(7).drag('[class*=burger-constructor-item_containerConstructor]');
      cy.get('[class*=burgerIngredientItem]').eq(11).drag('[class*=burger-constructor-item_containerConstructor]');
      cy.get('[class*=burgerIngredientItem]').eq(4).drag('[class*=burger-constructor-item_containerConstructor]');
      cy.get('[class*=burgerIngredientItem]').eq(0).drag('[class*=burger-constructor-item_containerConstructor]');

      cy.intercept('POST', '/api/orders').as('postOrder');
      cy.wait(1000).get('button').contains('Оформить заказ').click()
      cy.wait('@postOrder').its('response.statusCode').should('eq', 200);

      cy.wait(2000).get('[class^=order-details_identifiredOrderNumber]').and('exist')
      cy.get(('[class*=closeButton]')).click();

   })
})