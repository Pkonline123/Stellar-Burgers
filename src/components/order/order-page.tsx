import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { useEffect, useState } from "react";
import { getCurrentOrder } from "../../services/currentOrder/thunk";
import OrderCardDetails from "./order-card-details";
import { PacmanLoader } from "react-spinners";
import styled from "./order.module.css" 

export default function OrderPage() {
    const { id } = useParams();
    const dispatch = useAppDispatch();

    const currentOrder = useAppSelector((state) => state.currentOrder.orders);
    const [isLoadingm, setIsLodading] = useState(false);

    useEffect(() => {
        if (id) {
            setIsLodading(true);
            dispatch(getCurrentOrder(id)).then(() => setIsLodading(false));
        }
    }, [dispatch, id]);


    if (isLoadingm) {
        return <div className={styled.loader}>
            <PacmanLoader color="#ffffff" />
        </div>;
    }


    return currentOrder ? (
        <OrderCardDetails order={currentOrder} />
    ) : (
        <p>Заказ не найден</p>
    );
}
