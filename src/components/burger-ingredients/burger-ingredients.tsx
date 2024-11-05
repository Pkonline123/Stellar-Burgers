import React, { useEffect, useRef } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerItems from "./burger-ingredients-items";
import { useMemo } from 'react';
import BurgerConstructorStyle from "./burger-ingredients.module.css";
import DataItem from '../../utils/dataType';

type BurgerIngredientsProps = {
    data: DataItem[];
}


export default function BurgerIngredients({ data }: BurgerIngredientsProps) {
    const [current, setCurrent] = React.useState('bun')

    const burgerItems = useMemo(() => {
        return {
            bun: data.filter((element) => element.type === "bun"),
            sauce: data.filter((element) => element.type === "sauce"),
            main: data.filter((element) => element.type === "main"),
        };
    }, [data]);

    const banRef = useRef<HTMLDivElement>(null);
    const sauceRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);
    const isTabClick = useRef(false);

    useEffect(() => {
        if (isTabClick.current) {
            if (current === 'bun') {
                banRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
            } else if (current === 'sauce') {
                sauceRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
            } else if (current === 'main') {
                mainRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
            }
            isTabClick.current = false;
        }
    }, [current])

    function handelScroll() {

        if (isTabClick.current) return;

        const banRefY = banRef.current?.getBoundingClientRect().y || 0;
        const sauceRefY = sauceRef.current?.getBoundingClientRect().y || 0;
        const mainRefY = mainRef.current?.getBoundingClientRect().y || 0;

        if (banRefY > 0) {
            setCurrent("bun");
        }
        else if (sauceRefY > 0 && banRefY < 0) {
            setCurrent("sauce");
        }
        else if (mainRefY > 0 && sauceRefY < 0) {
            setCurrent("main");
        }
    }


    const handleTabClick = (section: string) => {
        isTabClick.current = true;
        setCurrent(section);
    };

    return (
        <section className={BurgerConstructorStyle.burgerIngredientsMainContainer}>
            <p className="text text_type_main-large pl-0 pr-0 pb-5 pt-10">
                Соберите бургер
            </p>
            <div className={BurgerConstructorStyle.burgerIngredientNavigation}>
                <Tab value="bun" active={current === 'bun'} onClick={() => handleTabClick("bun")}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={() => handleTabClick("sauce")}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={() => handleTabClick("main")}>
                    Начинки
                </Tab>
            </div>
            <div className={BurgerConstructorStyle.scroll} onScroll={handelScroll}>
                <div className={`${BurgerConstructorStyle.burgerIngredientsContainer}`}>
                    <p id="bun" className="text text_type_main-medium pl-0 pr-0 pb-4 pt-10" ref={banRef}>
                        Булки
                    </p>
                    <div className={BurgerConstructorStyle.burgerIngredientContainer}>
                        <BurgerItems data={burgerItems.bun} />
                    </div>
                    <p id="sauce" className="text text_type_main-medium pl-0 pr-0 pb-4 pt-10" ref={sauceRef}>
                        Соусы
                    </p>
                    <div className={BurgerConstructorStyle.burgerIngredientContainer}>
                        <BurgerItems data={burgerItems.sauce} />
                    </div>
                    <p id="main" className="text text_type_main-medium pl-0 pr-0 pb-4 pt-10" ref={mainRef}>
                        Начинки
                    </p>
                    <div className={BurgerConstructorStyle.burgerIngredientContainer}>
                        <BurgerItems data={burgerItems.main} />
                    </div>
                </div>
            </div>
        </section>
    );
}