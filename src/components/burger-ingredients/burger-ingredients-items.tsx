import React from "react";
import { Modal } from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useModal } from "../hooks/useModal";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { dropCurentIngrident, setCurentIngrident } from "../../services/ingredients/reducer";
import BurgerIngredientItem from "./burger-ingredient-item";
import DataItem from "../../utils/dataType";

type Props = {
    data: DataItem[];
};

export default function BurgerItems(props: Props) {
    const { isModalOpen, openModal, closeModal } = useModal();
    const currentElement = useAppSelector(state => state.ingredients.curentIngrident);
    const dispatch = useAppDispatch();

    function handleOpenModal(element: DataItem) {
        dispatch(setCurentIngrident(element));
        openModal();
    }

    function handleCloseModal() {
        dispatch(dropCurentIngrident());
        closeModal();
    }

    return (
        <>
            {props.data.map((element) => (
                <BurgerIngredientItem
                    key={element._id}
                    element={element}
                    onClick={handleOpenModal}
                />
            ))}

            {currentElement && isModalOpen &&
                <Modal onClose={handleCloseModal} title="Детали ингредиента">
                    <IngredientDetails {...currentElement} />
                </Modal>
            }
        </>
    );
}
