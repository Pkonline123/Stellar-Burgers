import React, { useEffect } from 'react';
import Header from '../header-item/header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burder-constructor/burger-constructor';
// import DataItem from '../../utils/data';
import mainStyles from './app.module.css';

const urlIngrident = "https://norma.nomoreparties.space/api/ingredients";
export default function App() {

  const [data, setData] = React.useState([]);

  useEffect(() => {
    const getData = async () => {
        try {
            const res = await fetch(urlIngrident);
            if (res.ok) {
                const data = await res.json();
                setData(data.data);
            } else {
                throw new Error(`Ошибка ${res.status}`);
            }
        } catch (error) {
            console.log(error);
        }
    };

    getData();
}, []);

  return (
    <>
      <Header />
      <main>
        <section className={mainStyles.mainContent}>
          <BurgerIngredients data={data} />
          <BurgerConstructor data={data} />
        </section>
      </main>
    </>
  );
}
