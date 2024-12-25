import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../services/store';
import OrderCard from './order-card';
import style from './order.module.css';


export default function Order() {

    const orders = useAppSelector(state => state.wsOrderAll.orders);
    const sortOrders = [...orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    const location = useLocation();
    const navigate = useNavigate();

    function handleOrderClick(number: number) {
        navigate(`${location.pathname}/${number}`, { state: { backgroundLocation: location } });
    }

    return (
        <div className={style.feedContainer}>
            {sortOrders.map((order, index) =>
                <div key={`${order._id}`} onClick={() => handleOrderClick(order.number)}>
                    <OrderCard order={order}
                    />
                </div>
                )
            }
        </div>
    );
}