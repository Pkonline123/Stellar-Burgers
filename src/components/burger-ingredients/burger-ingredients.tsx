import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerItem from "./burger-ingredients-item";
import { useMemo } from 'react';
import BurgerConstructorStyle from "./burger-ingredients.module.css";
import dataType from '../../utils/dataType';

type Props = {
    data: dataType[];
}


export default function BurgerIngredients(props: Props) {
    const [current, setCurrent] = React.useState('bun')

    const burgerItems = useMemo(() => {
        return {
            bun: props.data.filter((element) => element.type === "bun"),
            sauce: props.data.filter((element) => element.type === "sauce"),
            main: props.data.filter((element) => element.type === "main"),
        };
    }, [props.data]);

    return (
        <section className={BurgerConstructorStyle.burgerIngredientsMainContainer}>
            <p className="text text_type_main-large pl-0 pr-0 pb-5 pt-10">
                Соберите бургер
            </p>
            <div style={{ display: 'flex' }}>
                <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <div className={BurgerConstructorStyle.scroll}>
                <div className={`${BurgerConstructorStyle.burgerIngredientsContainer}`}>
                    <p id="bun" className="text text_type_main-medium pl-0 pr-0 pb-4 pt-10">
                        Булки
                    </p>
                    <div className={BurgerConstructorStyle.burgerIngredientContainer}>
                        <BurgerItem data={burgerItems.bun} />
                    </div>
                    <p id="sauce" className="text text_type_main-medium pl-0 pr-0 pb-4 pt-10">
                        Соусы
                    </p>
                    <div className={BurgerConstructorStyle.burgerIngredientContainer}>
                        <BurgerItem data={burgerItems.sauce} />
                    </div>
                    <p id="main" className="text text_type_main-medium pl-0 pr-0 pb-4 pt-10">
                        Начинки
                    </p>
                    <div className={BurgerConstructorStyle.burgerIngredientContainer}>
                        <BurgerItem data={burgerItems.main} />
                    </div>
                </div>
            </div>
        </section>
    );
}