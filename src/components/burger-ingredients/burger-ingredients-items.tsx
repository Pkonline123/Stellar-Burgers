import React from "react";
import { useAppDispatch } from "../../services/store";
import { setCurentIngrident } from "../../services/ingredients/reducer";
import BurgerIngredientItem from "./burger-ingredient-item";
import DataItem from "../../utils/dataType";
import { useLocation, useNavigate } from "react-router-dom";

type BurgerItemsProps = {
    data: DataItem[];
};

export default function BurgerItems({ data }: BurgerItemsProps) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
  
    function handleIngredientClick(element: DataItem) {
      dispatch(setCurentIngrident(element));
      navigate(`/ingredients/${element._id}`, { state: { backgroundLocation: location } });
    }
  
    return (
      <>
        {data.map((element) => (
          <BurgerIngredientItem
            key={element._id}
            element={element}
            onClick={() => handleIngredientClick(element)}
          />
        ))}
      </>
    );
  }
