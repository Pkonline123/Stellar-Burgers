import OrderInfo from '../components/order-info/order-info';
import Order from '../components/order/order';
import style from './pages.module.css';
import { useAppDispatch } from '../services/store';
import { useEffect } from 'react';
import { createWsActions } from '../services/wsOrders/actions';
import { WS_URL } from '../utils/consts';

export default function OrderFeed() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const wsOrderAllActions = createWsActions('wsOrderAll');

        dispatch({ type: wsOrderAllActions.connect, payload: `${WS_URL}/orders/all` });

        return () => {
            dispatch({ type: wsOrderAllActions.disconnect });
        };
    }, [dispatch]);



    return (
        <main className={style.mainOrderContainer}>
            <section className={style.orderContainer}>
                <div>
                    <p className="text text_type_main-large pl-0 pr-0 pb-5 pt-0">
                        Лента заказов
                    </p>
                    <Order />
                </div>
                <OrderInfo />
            </section>
        </main>
    );
}