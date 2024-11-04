import React, { useMemo } from "react";
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyle from './burger-constructor-item.module.css';
import DataItem from '../../utils/dataType';
import { Modal } from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useModal } from "../hooks/useModal";
import { useDrag, useDrop } from 'react-dnd';
import { addIngredient, removeIngredient, updateItemsOrder } from "../../services/constructor/reducer";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { fetchOrders } from "../../services/order/thunc";


function BurgerConstructorItem({ item, index }: { item: DataItem; index: number }) {
    const dispatch = useAppDispatch();

    const [{ isDragging }, dragRef] = useDrag({
        type: 'item',
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        })
    });

    const opasity = isDragging ? 0 : 1;

    const [, dropRef] = useDrop({
        accept: 'item',
        hover(draggedItem: { index: number }) {
            if (draggedItem.index !== index) {
                dispatch(updateItemsOrder({ fromIndex: draggedItem.index, toIndex: index }));
                draggedItem.index = index;
            }
        },
    });

    const handleDelete = () => {
        dispatch(removeIngredient(index));
    };

    return (
        <div ref={(node) => dragRef(dropRef(node))} className={burgerConstructorStyle.constructorItem} style={{ opacity: opasity }}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image_large}
                handleClose={handleDelete}
            />
        </div>
    );
}

export default function BurgerConstructor() {

    const { isModalOpen, openModal, closeModal } = useModal();
    const { bun, items } = useAppSelector((state) => state.constructorBurger);
    const orderInfo = useAppSelector((state) => state.order);
    const dispatch = useAppDispatch();

    //Если необходмо будет подстветить область, можно за юзать овер
    const [, dropTarget] = useDrop({
        accept: 'ingredient',
        drop: (item: DataItem) => handleDrop(item),
        // collect: (monitor) => ({
        //     isOver: monitor.isOver(),
        // }),
    });

    const handleDrop = (item: DataItem) => {
        dispatch(addIngredient(item));
    };

    const postOrderInfo = () => {
        const ingredients = bun?._id ? [bun._id, ...items.map((item) => item._id), bun._id] : items.map((item) => item._id);

        dispatch(fetchOrders(ingredients)).then(() => {
            openModal()
        });
    }

    // function toggleModal() {
    //     if (isModalOpen) {
    //         closeModal();
    //     } else {
    //         openModal();
    //     }
    // }

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
                                // <div key={`${element._id}${index}`} className={burgerConstructorStyle.constructorItem} style={{ opacity }}>
                                //     <DragIcon type="primary" />
                                //     <ConstructorElement
                                //         text={element.name}
                                //         price={element.price}
                                //         thumbnail={element.image_large}
                                //         handleClose={() => handleDelete(index)}
                                //     />
                                // </div>
                                <BurgerConstructorItem key={`${element._id}${index}`} item={element} index={index} />
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