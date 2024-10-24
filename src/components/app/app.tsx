import React from 'react';
import Header from '../header-item/header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burder-constructor/burger-constructor';
import DataItem from '../../utils/data';
import mainStyles from './app.module.css';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <section className={mainStyles.mainContent}>
          <BurgerIngredients data={DataItem} />
          <BurgerConstructor data={DataItem} />
        </section>
      </main>
    </>
  );
}
