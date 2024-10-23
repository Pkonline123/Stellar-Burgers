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
    const getData = async () => await fetch(urlIngrident).then(res => res.json()).then(res => setData(res.data)).catch(err => console.log(err));

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
