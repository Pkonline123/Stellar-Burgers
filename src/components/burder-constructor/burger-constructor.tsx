import React, { useMemo } from "react";
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyle from './burger-constructor-item.module.css';
import dataType from '../../utils/dataType';

type Props = {
    data: dataType[];
}

export default function BurgerConstructor(props: Props) {
    const allPrice = useMemo(() => {
        return props.data.reduce((acc, element) => acc + element.price, 0);
    }, [props.data]);

    return (
        <section>
            <div className={`${burgerConstructorStyle.containerConstructor} mr-4 mb-10 ml-4 mt-25`}>
                <div className={burgerConstructorStyle.scroll}>
                    {props.data.map((element, index: React.Key, array) => (
                        <div key={element._id} className={`${index === 0 ? "pl-8 pr-8 pb-0 pt-0" : index === array.length - 1 ? "pl-8 pr-8 pb-0 pt-0" : "pl-0 pr-8 pb-0 pt-0"}`} >
                            <div className={burgerConstructorStyle.constructorItem}>
                                {index === 0 ? undefined : index === array.length - 1 ? undefined : <DragIcon type={"primary"} />}
                                <ConstructorElement
                                    key={index}
                                    type={index === 0 ? "top" : index === array.length - 1 ? "bottom" : undefined}
                                    isLocked={index === 0 ? true : index === array.length - 1 ? false : undefined}
                                    text={index === 0 ? `${element.name} верх` : index === array.length - 1 ? `${element.name} низ` : `${element.name}`}
                                    price={element.price}
                                    thumbnail={element.image_large}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={burgerConstructorStyle.confirmContainer}>
                <div className={burgerConstructorStyle.priceContainer}>
                    <p className="text text_type_main-default">{allPrice}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <div>
                    <Button htmlType="button" type="primary" size="medium">
                        Оформить заказ
                    </Button>
                </div>
            </div>
        </section>
    );
}