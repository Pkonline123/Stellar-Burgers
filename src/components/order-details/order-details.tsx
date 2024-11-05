import React from "react";
import ConfirmOrder from "../../images/confirmOrder.svg";
import styles from "./order-details.module.css";

type OrderDetailsProps = {
    number: null | number
}

export default function OrderDetails({ number }: OrderDetailsProps) {
    return (
        <div className={styles.container}>
            {number &&
                <>
                    <p className={`${styles.identifiredOrderNumber} text text_type_digits-large`}>{number}</p>
                    <p className={`${styles.identifiredOrderText} text text_type_main-medium`}>
                        идентификатор заказа
                    </p>
                    <img className={styles.identifiredOrderImg} src={ConfirmOrder} alt="123" />
                    <div className={styles.identifiredOrderTextContainer}>
                        <p className="text text_type_main-default">
                            Ваш заказ начали готовить
                        </p>
                        <p className="text text_type_main-default text_color_inactive">
                            Дождитесь готовности на орбитальной станции
                        </p>
                    </div>
                </>
            }

        </div>
    );
}