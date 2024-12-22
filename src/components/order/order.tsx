import { useAppSelector } from '../../services/store';
import OrderCard from './order-card';
import style from './order.module.css';


export default function Order() {

    const orders = useAppSelector(state => state.wsOrderAll.orders);
    return (
        <div className={style.feedContainer}>
            {orders.map(order => <OrderCard key={order._id} order={order} />)}
        </div>
    );
}