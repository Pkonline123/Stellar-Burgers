import React, { useMemo } from "react";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorStyle from "./burger-ingredients.module.css";
import DataItem from "../../utils/dataType";
import { useDrag } from 'react-dnd';
import { useAppSelector } from "../../services/store";

type Props = {
    element: DataItem;
    onClick: (element: DataItem) => void;
}

export default function BurgerIngredientItem({ element, onClick }: Props) {
    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: 'ingredient',
        item: element,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    const constructorBurger = useAppSelector((store) => store.constructorBurger);

    const count = useMemo(() => {
        if (!constructorBurger) return 0;
        const itemCounts = constructorBurger.items.filter((item) => item._id === element._id).length;
        return constructorBurger.bun?._id === element._id ? itemCounts + 2 : itemCounts;
    }, [constructorBurger, element]);

    return (
        <div
            ref={dragRef}
            className={`${BurgerConstructorStyle.burgerIngredientItem} : ''}`}
            onClick={() => onClick(element)}
            style={{ opacity: isDragging ? 0.5 : 1 }}
        >
            {count > 0 &&
                < Counter count={count} size="default" extraClass="m-1" />
            }
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
    );
}
