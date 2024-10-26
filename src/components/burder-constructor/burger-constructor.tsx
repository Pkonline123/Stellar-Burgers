import React, { useMemo } from "react";
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyle from './burger-constructor-item.module.css';
import DataItem from '../../utils/dataType';
import { Modal } from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useModal } from "../hooks/useModal";

type Props = {
    data: DataItem[];
}

export default function BurgerConstructor(props: Props) {

    const { isModalOpen, openModal, closeModal } = useModal();

    function toggleModal() {
        if (isModalOpen) {
            closeModal();
        } else {
            openModal();
        }
    }
    
    const allPrice = useMemo(() => {
        const firstBun = props.data[0];
        return props.data.reduce((acc, element, index) => {
            if (index === 0 || index === props.data.length - 1) {
                return acc + firstBun.price;
            }

            return acc + element.price;
        }, 0);
    }, [props.data]);

    if (props.data.length === 0) {
        return null
    }
    return (
        <section>
            <div className={`${burgerConstructorStyle.containerConstructor} mr-4 mb-10 ml-4 mt-25`}>
                <div>
                    <div className="pl-6 pt-4 pb-4 pr-8">
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={`${props.data[0].name} верх`}
                            price={props.data[0].price}
                            thumbnail={props.data[0].image_large}
                        />
                    </div>
                    <div className={burgerConstructorStyle.scroll}>
                        {props.data.map((element, index: React.Key, array) => (
                            index === 0 ? null : index === array.length - 1 ? null : (
                                <div key={element._id} className={`${index === 0 ? "pl-8 pr-8 pb-0 pt-0" : index === array.length - 1 ? "pl-8 pr-8 pb-0 pt-0" : "pl-0 pr-8 pb-0 pt-0"}`} >
                                    <div className={burgerConstructorStyle.constructorItem}>
                                        {index === 0 ? undefined : index === array.length - 1 ? undefined : <DragIcon type={"primary"} />}
                                        <ConstructorElement
                                            key={index}
                                            type={index === 0 ? "top" : index === array.length - 1 ? "bottom" : undefined}
                                            isLocked={index === 0 ? true : index === array.length - 1 ? true : undefined}
                                            text={index === 0 ? `${element.name} верх` : index === array.length - 1 ? `${element.name} низ` : `${element.name}`}
                                            price={element.price}
                                            thumbnail={element.image_large}
                                        />
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                    <div className="pl-6 pt-4 pb-4 pr-8">
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={`${props.data[0].name} низ`}
                            price={props.data[0].price}
                            thumbnail={props.data[0].image_large}
                        />
                    </div>
                </div>
            </div>
            <div className={burgerConstructorStyle.confirmContainer}>
                <div className={burgerConstructorStyle.priceContainer}>
                    <p className="text text_type_main-default">{allPrice}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <div>
                    <Button htmlType="button" type="primary" size="medium" onClick={toggleModal}>
                        Оформить заказ
                    </Button>
                </div>
            </div>
            {isModalOpen && (
                <Modal onClose={closeModal}>
                    <OrderDetails />
                </Modal>
            )}
        </section >
    );
}