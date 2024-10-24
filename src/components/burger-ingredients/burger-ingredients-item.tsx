import React from "react";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorStyle from "./burger-ingredients.module.css";
import DataItem from "../../utils/dataType";

type Props = {
    data: DataItem[];
}

export default function BurgerItem(props: Props) {
    return (
        <>
            {props.data.map((element) => (
                <div key={element._id} className={BurgerConstructorStyle.burgerIngredientItem}>
                    <Counter count={1} size="default" extraClass="m-1" />
                    <img alt={element.name} title={element.name} src={element.image} />
                    <div className={`${BurgerConstructorStyle.burgerIngredientitemPrice} pl-0 pr-0 pb-1 pt-1`}>
                        <p className="text text_type_main-small">
                            {element.price}
                        </p>
                        <CurrencyIcon type="primary" />
                    </div>
                    <p className="text text_type_main-default">
                        {element.name}
                    </p>
                </div>
            ))}

        </>
    );
}