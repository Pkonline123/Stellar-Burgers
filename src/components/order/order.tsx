import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../services/store';
import OrderCard from './order-card';
import style from './order.module.css';


export default function Order() {

    const location = useLocation();
    const orders = useAppSelector(location.pathname === '/feed' ? state => state.wsOrderAll.orders : state => state.wsPersonOrders.orders);
    const sortOrders = [...orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    const navigate = useNavigate();

    function handleOrderClick(number: number) {
        navigate(`${location.pathname}/${number}`, { state: { backgroundLocation: location } });
    }

    return (
        <div className={style.feedContainer}>
            {sortOrders.map((order, index) =>
                <div key={`${order._id} ${index}`} onClick={() => handleOrderClick(order.number)}>
                    <OrderCard order={order} />
                </div>
            )
            }
        </div>
    );
}