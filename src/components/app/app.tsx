import React, { useEffect } from 'react';
import Header from '../header-item/header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burder-constructor/burger-constructor';
import mainStyles from './app.module.css';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { fetchIngredients } from '../../services/ingredients/thunc';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { RootState } from '../../services/store';

const getState = (store: RootState) => store.ingredients.items;

export default function App() {
  const dispatch = useAppDispatch();
  const data = useAppSelector(getState);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <>
      <Header />
      <DndProvider backend={HTML5Backend}>
        <main>
          <section className={mainStyles.mainContent}>
            <BurgerIngredients data={data} />
            <BurgerConstructor />
          </section>
        </main>
      </DndProvider>
    </>
  );
}
