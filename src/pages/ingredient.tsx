import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../services/store";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import { setCurentIngrident } from "../services/ingredients/reducer";

export default function IngredientPage() {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const ingredient = useAppSelector((state) =>
      state.ingredients.items.find((item) => item._id === id)
    );
  
    useEffect(() => {
      if (ingredient) {
        dispatch(setCurentIngrident(ingredient));
      }
    }, [dispatch, ingredient]);
  
    return ingredient ? <IngredientDetails {...ingredient} /> : <p>Ингредиент не найден</p>;
  }
