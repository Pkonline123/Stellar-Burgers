import React, { useEffect, useMemo } from "react";
import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyle from './burger-constructor-item.module.css';
import DataItem from '../../utils/dataType';
import { Modal } from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useModal } from "../hooks/useModal";
import { useDrop } from 'react-dnd';
import { addIngredient, dropAllIngridents, restoreConstructor } from "../../services/constructor/reducer";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { fetchOrders } from "../../services/order/thunk";
import BurgerConstructorItem from "./burger-constructor-item";
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../../services/store';
import { useNavigate } from "react-router-dom";

const getStateConstructorBurger = (store: RootState) => store.constructorBurger;
const getStateOrder = (store: RootState) => store.order;
const getStateUser = (store: RootState) => store.user.user;

export default function BurgerConstructor() {

    const { isModalOpen, openModal, closeModal } = useModal();
    const { bun, items } = useAppSelector(getStateConstructorBurger);
    const user = useAppSelector(getStateUser);
    const orderInfo = useAppSelector(getStateOrder);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const constructorState = { bun, items };
        localStorage.setItem('constructorBurger', JSON.stringify(constructorState));
    }, [bun, items])

    useEffect(() => {
        const savedState = localStorage.getItem('constructorBurger');
        if (savedState) {
            try {
                const parsedState = JSON.parse(savedState);
                if (parsedState && typeof parsedState === 'object') {
                    dispatch(restoreConstructor(parsedState));
                }
            } catch (error) {
                console.error('Ошибка в парсинге данных из localStorage:', error);
            }
        }
    }, [dispatch]);

    const [, dropTarget] = useDrop({
        accept: 'ingredient',
        drop: (item: DataItem) => handleDrop(item),
    });

    const handleDrop = (item: DataItem) => {
        const ingredientWithId = { ...item, id: uuidv4() };
        dispatch(addIngredient(ingredientWithId))
    };

    const postOrderInfo = () => {
        if (!user) {
            navigate('/login', { replace: true });
            return
        }

        const ingredients = bun?._id ? [bun._id, ...items.map((item) => item._id), bun._id] : items.map((item) => item._id);

        if (ingredients.length === 0 || bun === null) return

        dispatch(fetchOrders(ingredients)).then(() => {
            openModal()
            dispatch(dropAllIngridents());
        });
    }

    const allPrice = useMemo(() => {
        const bunPrice = bun ? bun.price * 2 : 0;
        const ingredientsPrice = items ? items.reduce((acc, element) => acc + element.price, 0) : 0;
        return bunPrice + ingredientsPrice;
    }, [bun, items]);


    return (
        <section ref={dropTarget} className={burgerConstructorStyle.burgerConstructorMainContainer}>
            <div className={`${burgerConstructorStyle.containerConstructor} mr-4 mb-10 ml-4 mt-25`}>
                <div className={burgerConstructorStyle.burgerContainerDraging}>

                    {bun ? (
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={`${bun.name} (верх)`}
                            price={bun.price}
                            thumbnail={bun.image_large}
                        />
                    ) : (
                        <div className={burgerConstructorStyle.burgerBunTopDraging}>
                            <p className="text text_type_main-default">Выберите булку</p>
                        </div>
                    )}

                    {items && items.length > 0 ? (
                        <div className={`${burgerConstructorStyle.scroll} mr-0 mb-4 ml-0 mt-4`}>
                            {items.map((element, index) => (
                                <BurgerConstructorItem key={element.id} item={element} index={index} />
                            ))}
                        </div>
                    ) : (
                        <div className={burgerConstructorStyle.burgerBunMidleDraging}>
                            <p className="text text_type_main-default">Выберите ингридиент</p>
                        </div>
                    )}

                    {bun ? (
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={`${bun.name} (низ)`}
                            price={bun.price}
                            thumbnail={bun.image_large}
                        />
                    ) : (
                        <div className={burgerConstructorStyle.burgerBunBotDraging}>
                            <p className="text text_type_main-default">Выберите булку</p>
                        </div>
                    )}
                </div>

                <div className={burgerConstructorStyle.confirmContainer}>
                    <div className={burgerConstructorStyle.priceContainer}>
                        <p className="text text_type_main-default">{allPrice}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                    <Button htmlType="button" type="primary" size="medium" onClick={postOrderInfo}>
                        Оформить заказ
                    </Button>
                </div>

                {isModalOpen && (
                    <Modal onClose={closeModal}>
                        <OrderDetails number={orderInfo.order?.number ?? null} />
                    </Modal>
                )}
            </div>
        </section>
    );
}