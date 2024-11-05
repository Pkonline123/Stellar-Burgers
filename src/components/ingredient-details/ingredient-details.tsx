import React from "react";
import DataItem from "../../utils/dataType";
import styles from "./ingredient-details.module.css";


export default function IngredientDetails({ image_large, name, calories, proteins, fat, carbohydrates }: DataItem) {
    return (
        <div className={styles.ingredientDetailsConatiner}>
            <img className={styles.ingredientDetailsImg} src={image_large} alt={name} />
            <div className={styles.ingredientDetailsInformation}>
                <p className="text text_type_main-medium">{name}</p>
                <div className={styles.featuresIngredientsContainer}>
                    <div className={styles.featuresIngredients}>
                        <p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
                        <p className="text text_type_main-default text_color_inactive">{calories}</p>
                    </div>
                    <div className={styles.featuresIngredients}>
                        <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                        <p className="text text_type_main-default text_color_inactive">{proteins}</p>
                    </div>
                    <div className={styles.featuresIngredients}>
                        <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                        <p className="text text_type_main-default text_color_inactive">{fat}</p>
                    </div>
                    <div className={styles.featuresIngredients}>
                        <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                        <p className="text text_type_main-default text_color_inactive">{carbohydrates}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}