import React from "react";
import DataItem from "../../utils/dataType";
import styles from "./ingredient-details.module.css";

export default function IngredientDetails(props: DataItem) {
    return (
        <>
            <div className={styles.ingredientDetailsConatiner}>
                <img className={styles.ingredientDetailsImg} src={props.image_large} alt={props.name} />
                <div className={styles.ingredientDetailsInformation}>
                    <p className="text text_type_main-medium">{props.name}</p>
                    <div className={styles.featuresIngredientsContainer}>
                        <div className={styles.featuresIngredients}>
                            <p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
                            <p className="text text_type_main-default text_color_inactive">{props.calories}</p>
                        </div>
                        <div className={styles.featuresIngredients}>
                            <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                            <p className="text text_type_main-default text_color_inactive">{props.proteins}</p>
                        </div>
                        <div className={styles.featuresIngredients}>
                            <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                            <p className="text text_type_main-default text_color_inactive">{props.fat}</p>
                        </div>
                        <div className={styles.featuresIngredients}>
                            <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                            <p className="text text_type_main-default text_color_inactive">{props.carbohydrates}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}