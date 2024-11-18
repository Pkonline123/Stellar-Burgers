import React from 'react';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burder-constructor/burger-constructor';
import mainStyles from './pages.module.css';
import { useAppSelector } from '../services/store';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { RootState } from '../services/store';
import { PacmanLoader } from 'react-spinners';

const getState = (store: RootState) => store.ingredients.items;
const getOrderLoader = (store: RootState) => store.order.isLoading;

export default function HomePage() {

  const data = useAppSelector(getState);
  const isLoading = useAppSelector(getOrderLoader);

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <main>
          <section className={`${mainStyles.homeContainer}`}>
            <BurgerIngredients data={data} />
            <BurgerConstructor />
          </section>
          {isLoading && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 10,
              }}
            >
              <PacmanLoader color="#ffffff" />
            </div>
          )}
        </main>
      </DndProvider>
    </>
  );
}