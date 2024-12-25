import { useEffect } from "react";
import { useAppDispatch } from "../../services/store";
import Order from "../order/order";
import style from "./profile-orders.module.css";

export default function ProfileOrders() {

    const dispatch = useAppDispatch();
    
        useEffect(() => {
            const token = localStorage.getItem('accessToken')?.split(' ')[1];
            dispatch({ type: 'ws/connect', payload: `wss://norma.nomoreparties.space/orders?token=${token}` });
    
            return () => {
                dispatch({ type: 'ws/disconnect' });
            }
        }, [dispatch]);

    return (
        <section className={style.profilOrdersContainer}>
            <Order />
        </section>
    );
}