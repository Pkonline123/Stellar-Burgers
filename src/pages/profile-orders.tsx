import { useEffect } from "react";
import { useAppDispatch } from "../services/store";
import Order from "../components/order/order";
import style from "./pages.module.css";
import { createWsActions } from '../services/wsOrders/actions';

export default function ProfileOrders() {

    const dispatch = useAppDispatch();

    useEffect(() => {
        const wsPersonOrdersActions = createWsActions('wsPersonOrders');
        const token = localStorage.getItem("accessToken")?.split(" ")[1];
        dispatch({
            type: wsPersonOrdersActions.connect,
            payload: `wss://norma.nomoreparties.space/orders?token=${token}`,
        });

        return () => {
            dispatch({ type: wsPersonOrdersActions.disconnect });
        };
    }, [dispatch]);


    return (
        <section className={style.profilOrdersContainer}>
            <Order />
        </section>
    );
}