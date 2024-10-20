import React from 'react';
import Header from '../header-item/header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burder-constructor/burger-constructor';
import data from '../../utils/data';
import mainStyles from './app.module.css';

export default function  App() {
  return (
    <>
      <Header />
      <div className={mainStyles.mainContent}>
          <BurgerIngredients data={data} />
          <BurgerConstructor data={data}/>
      </div>
    </>
  );
}
