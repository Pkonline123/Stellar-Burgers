import OrderInfo from '../order-info/order-info';
import Order from '../order/order';
import style from './order-feed.module.css';
import { useAppDispatch } from '../../services/store';
import { useEffect } from 'react';

export default function OrderFeed() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch({ type: 'ws/connect' });

        return () => {
            dispatch({ type: 'ws/disconnect' });
        }
    }, [dispatch]);

    return (
        <main className={style.mainContainer}>
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