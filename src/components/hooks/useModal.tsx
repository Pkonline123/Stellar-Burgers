import { useState, useCallback } from "react";
import { useAppDispatch } from "../../services/store";
import { dropCurentOrder } from "../../services/currentOrder/reducer";

// кастомные хуки всегда должны начинаться с глагола `use`, чтобы реакт понял, что это хук. Он следит за их вызовами
export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();

  // `useCallback` нужен для того, чтобы зафиксировать ссылку на функцию. Таким образом уменьшится кол-во перерисовок компонента, куда будет передана эта функция
  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    dispatch(dropCurentOrder());
  }, [dispatch]);

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
};
