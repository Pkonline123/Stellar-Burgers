import React from "react";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyle from './burger-constructor-item.module.css';
import DataItem from '../../utils/dataType';
import { useDrag, useDrop } from 'react-dnd';
import { removeIngredient, updateItemsOrder } from "../../services/constructor/reducer";
import { useAppDispatch } from "../../services/store";

export default function BurgerConstructorItem({ item, index }: { item: DataItem; index: number }) {
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
        // dispatch(removeIngredient(index));
        dispatch(removeIngredient(item.id));
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