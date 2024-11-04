import React, { useEffect, useRef } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerItems from "./burger-ingredients-items";
import { useMemo } from 'react';
import BurgerConstructorStyle from "./burger-ingredients.module.css";
import DataItem from '../../utils/dataType';

type Props = {
    data: DataItem[];
}

//const sections = ['bun', 'sauce', 'main'];
export default function BurgerIngredients(props: Props) {
    const [current, setCurrent] = React.useState('bun')
    //const [visibleSection, setVisibleSection] = React.useState<string | null>(null);

    const burgerItems = useMemo(() => {
        return {
            bun: props.data.filter((element) => element.type === "bun"),
            sauce: props.data.filter((element) => element.type === "sauce"),
            main: props.data.filter((element) => element.type === "main"),
        };
    }, [props.data]);

    const banRef = useRef<HTMLDivElement>(null);
    const sauceRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);
    const isTabClick = useRef(false);
    //const observerRef = useRef<IntersectionObserver | null>(null);

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

    // useEffect(() => {
    //     const observer = new IntersectionObserver((entries) => {
    //         const entry = entries[0];
    //         if (entry.isIntersecting) {
    //             setVisibleSection(entry.target.id);
    //         }
    //     }, {
    //         root: null,
    //         rootMargin: '0px',
    //         threshold: 0.5,
    //     });

    //     sections.forEach((section) => {
    //         const ref = {
    //             bun: banRef,
    //             sauce: sauceRef,
    //             main: mainRef,
    //         }[section];
    //         if(!ref?.current) return;
    //         observer.observe(ref.current);
    //     });

    //     observerRef.current = observer;

    //     return () => {
    //         observer.disconnect();
    //     };
    // }, []);

    // useEffect(() => {
    //     if (visibleSection && visibleSection !== current) {
    //         setCurrent(visibleSection);
    //     }
    // }, [visibleSection, current]);


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