import React from 'react';
import Header from '../header-item/header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

export default function  App() {
  return (
    <>
      <Header />
      <div>
          <BurgerIngredients />
      </div>
    </>
  );
}
