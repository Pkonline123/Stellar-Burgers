import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './order.module.css';
import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { CurrentOrder } from '../../services/currentOrder/reducer';
import { fetchIngredients } from '../../services/ingredients/thunk';
import DataItem from '../../utils/dataType';
import dayjs from 'dayjs';

export default function OrderCardDetails({ order }: { order: CurrentOrder }) {
    const allIngredients = useAppSelector(state => state.ingredients.items);
    const isLoading = useAppSelector(state => state.ingredients.loadding);
    const dispatch = useAppDispatch();
    const [ingredientsLoaded, setIngredientsLoaded] = useState(false);

    useEffect(() => {
        if (allIngredients.length === 0) {
            dispatch(fetchIngredients())
                .then(() => setIngredientsLoaded(true))
                .catch(() => setIngredientsLoaded(true));
        } else {
            setIngredientsLoaded(true);
        }
    }, [dispatch, allIngredients]);

    const ingredients = useMemo(() => {
        return order.ingredients.map(ingredientId =>
            allIngredients.find(ingredient => ingredient._id === ingredientId)
        )
    }, [order, allIngredients]);

    type IngredientCount = DataItem & { count: number };

    const uniqueIngredients = useMemo(() => {
        const ingredientCounts = order.ingredients.reduce<Record<string, IngredientCount>>(
            (acc, ingredientId) => {
                const ingredient = allIngredients.find((item) => item._id === ingredientId);
                if (ingredient) {
                    acc[ingredientId] = acc[ingredientId]
                        ? { ...acc[ingredientId], count: acc[ingredientId].count + 1 }
                        : { ...ingredient, count: 1 };
                }
                return acc;
            },
            {}
        );
        return Object.values(ingredientCounts);
    }, [order, allIngredients]);


    const totalPrice = useMemo(() => ingredients.reduce((acc, ingredient) =>
        acc + (ingredient?.price || 0), 0)
        , [ingredients]);

    if (!ingredientsLoaded || isLoading) {
        return <p>Загрузка ингредиентов...</p>;
    }

    const format = (date: string) => {
        const parsedDate = dayjs(date);
        const now = dayjs();
        const diff = now.diff(date, 'day');

        if (diff === 0) {
            return `Сегодня, ${parsedDate.format('HH:mm')}`;
        } else if (diff === 1) {
            return `Вчера, ${parsedDate.format('HH:mm')}`;
        } else {
            return `${diff} дня назад, ${parsedDate.format('HH:mm')}`;
        }
    };

    return (
        <div className={style.orderCardPageConatiner}>
            <div>
                <div className={`${style.orderCardPageNumber} pb-10`}>
                    <p className="text text_type_main-default">
                        #{order.number}
                    </p>
                </div>
                <div className={`${style.orderCardPageBurgerName} pb-15`}>
                    <p className="text text_type_main-medium pb-3">
                        {order.name}
                    </p>
                    {order.status === 'done' ?
                        <p className={`text text_type_main-default ${style.statusOrderDone}`}>
                            Выполнен
                        </p> : order.status === 'pending' ?
                            <p className="text text_type_main-default">
                                Готовится
                            </p> :
                            <p className="text text_type_main-default">
                                Создан
                            </p>
                    }
                </div>
                <div>
                    <p className="text text_type_main-medium pb-6">
                        Состав:
                    </p>
                </div>
                <div className={`${style.orderCardPageBurgerImgContainer}`}>
                    {uniqueIngredients.map((ingredient) => (
                        <div key={ingredient._id} className={style.orderCardPageBurgerConatiner}>
                            <div className={style.orderCardPageBurgerConatiner}>
                                <div className={`${style.orderCardPageBurger} pr-4`}>
                                    <img className={style.orderCardPageBurgerImg} src={ingredient.image_mobile} alt={ingredient.name} />
                                </div>
                                <p>{ingredient.name}</p>
                            </div>
                            <div className={style.feedFooterPrice}>
                                <p className="text text_type_main-small">
                                    {ingredient.count} × {ingredient.price}
                                </p>
                                <CurrencyIcon type="primary" />
                            </div>
                        </div>
                    ))}
                </div>
                <div className={`${style.orderCardPageFooter} pt-10`}>
                    <p className="text text_type_main-small text_color_inactive">
                        {format(order.createdAt)}
                    </p>
                    <div className={style.feedFooterPrice}>
                        <p className="text text_type_main-small">
                            {totalPrice}
                        </p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>
        </div>
    );
}
