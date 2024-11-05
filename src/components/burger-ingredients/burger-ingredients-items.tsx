import React from "react";
import { Modal } from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useModal } from "../hooks/useModal";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { dropCurentIngrident, setCurentIngrident } from "../../services/ingredients/reducer";
import BurgerIngredientItem from "./burger-ingredient-item";
import DataItem from "../../utils/dataType";
import { RootState } from '../../services/store';

type BurgerItemsProps = {
    data: DataItem[];
};

const getStateConstructorBurger = (store: RootState) => store.ingredients.curentIngrident;

export default function BurgerItems({ data }: BurgerItemsProps) {
    const { isModalOpen, openModal, closeModal } = useModal();
    const currentElement = useAppSelector(getStateConstructorBurger);
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
            {data.map((element) => (
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
