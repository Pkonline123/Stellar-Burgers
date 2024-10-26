import React from "react";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorStyle from "./burger-ingredients.module.css";
import DataItem from "../../utils/dataType";
import { Modal } from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useModal } from "../hooks/useModal";

type Props = {
    data: DataItem[];
}

export default function BurgerItems(props: Props) {

    const { isModalOpen, openModal, closeModal } = useModal();

    const [currentElement, setCurrentElement] = React.useState<DataItem | null>(null);

    function handleOpenModal(element: DataItem) {
        setCurrentElement(element);
        openModal();
    }

    return (
        <>
            {props.data.map((element) => (
                <div key={element._id} className={BurgerConstructorStyle.burgerIngredientItem} onClick={() => handleOpenModal(element)}>
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

            {currentElement && isModalOpen &&
                <Modal onClose={closeModal} title="Детали ингредиента">
                    <IngredientDetails {...currentElement} />
                </Modal >
            }
        </>
    );
}