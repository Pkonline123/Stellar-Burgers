import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

export default function BurgerIngredients() {
    const [current, setCurrent] = React.useState('one')

    return (
        <section>
            <p className="text text_type_main-large">
                Соберите бургер
            </p>
            <div style={{ display: 'flex' }}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
        </section>
    );
}