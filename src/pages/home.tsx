import React, { useEffect } from 'react';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burder-constructor/burger-constructor';
import mainStyles from './pages.module.css';
import { useAppDispatch, useAppSelector } from '../services/store';
import { fetchIngredients } from '../services/ingredients/thunk';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { RootState } from '../services/store';

const getState = (store: RootState) => store.ingredients.items;

export default function HomePage() {

    const dispatch = useAppDispatch();
    const data = useAppSelector(getState);
  
    useEffect(() => {
      dispatch(fetchIngredients());
    }, [dispatch]);

  return (
    <DndProvider backend={HTML5Backend}>
        <main>
          <section className={mainStyles.homeContainer}>
            <BurgerIngredients data={data} />
            <BurgerConstructor />
          </section>
        </main>
      </DndProvider>
  );
}