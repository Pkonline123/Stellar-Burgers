import { useAppSelector } from '../../services/store';
import { Orders } from '../../services/wsOrdersAll/reducer';
import style from './order-info.module.css';

export default function OrderInfo() {

    const orders = useAppSelector(state => state.wsOrderAll);

    const splitOrders = (orders: Orders[], status: string) => {
        const filteredOrders = orders.filter(order => order.status === status);
        const firstColumn = filteredOrders.slice(0, 10);
        const secondColumn = filteredOrders.slice(10, 20);
        return [firstColumn, secondColumn];
    };

    const [doneOrdersColumn1, doneOrdersColumn2] = splitOrders(orders.orders, 'done');
    const [workOrdersColumn1, workOrdersColumn2] = splitOrders(orders.orders, 'pending');

    return (
        <div className={style.orderInfoContainer}>
            <div className={style.orderNumbers}>
                <div>
                    <p className="text text_type_main-medium pb-6">Готовы:</p>
                    <div className={style.columnsContainer}>
                        <div>
                            {doneOrdersColumn1.map(order => (
                                <div key={order._id} className={style.orderComlitedOrWorkNumber}>
                                    <p className={`${style.orderComlitedColorNumber} text text_type_main-default`}>
                                        {order.number}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div>
                            {doneOrdersColumn2.map(order => (
                                <div key={order._id} className={style.orderComlitedOrWorkNumber}>
                                    <p className={`${style.orderComlitedColorNumber} text text_type_main-default`}>
                                        {order.number}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div>
                    <p className="text text_type_main-medium pb-6">В работе:</p>
                    <div className={style.columnsContainer}>
                        <div>
                            {workOrdersColumn1.map(order => (
                                <div key={order._id} className={style.orderComlitedOrWorkNumber}>
                                    <p className="text text_type_main-default">{order.number}</p>
                                </div>
                            ))}
                        </div>
                        <div>
                            {workOrdersColumn2.map(order => (
                                <div key={order._id} className={style.orderComlitedOrWorkNumber}>
                                    <p className="text text_type_main-default">{order.number}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <p className="text text_type_main-medium">
                    Выполнено за все время:
                </p>
                <p className={`${style.orderNumber} text text_type_digits-large`}>
                    {orders.total}
                </p>
            </div>
            <div>
                <p className="text text_type_main-medium">
                    Выполнено за сегодня:
                </p>
                <p className={`${style.orderNumber} text text_type_digits-large`}>
                    {orders.totalToday}
                </p>
            </div>
        </div>
    );
}