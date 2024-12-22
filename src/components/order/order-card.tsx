import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './order.module.css';
import { Orders } from '../../services/wsOrdersAll/reducer';
import { useAppSelector } from '../../services/store';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export default function OrderCard({ order }: { order: Orders }) {

    const allIngredients = useAppSelector(state => state.ingredients.items);
    const location = useLocation();

    const ingredients = useMemo(() => order.ingredients.map(ingredientId => {
        return allIngredients.find(ingredient => ingredient._id === ingredientId);
    }), [order, allIngredients]);

    const totalPrice = useMemo(() => ingredients.reduce((acc, ingredient) =>
        acc + (ingredient?.price || 0), 0)
        , [ingredients]);

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
        <div className={style.feedElement}>
            <div className={style.feedHeader}>
                <p className="text text_type_main-default">
                    #{order.number}
                </p>
                <p className="text text_type_main-default text_color_inactive">
                    {format(order.createdAt)}
                </p>
            </div>
            <div className={style.feedBody}>
                <p className="text text_type_main-medium">
                    {order.name}
                </p>
                {location.pathname === '/feed' ?
                    null
                    : <p className="text text_type_main-default">
                        Создан
                    </p>
                }
            </div>
            <div className={style.feedFooter}>
                <div className={style.feedFooterIngredients}>
                    {/* {ingredients.map((ingredient, index) =>
                        <>
                            <img style={{ marginLeft: index !== 0 ? -15 : 0, zIndex: ingredients.length - index }}
                                className={style.feedFooterImg} key={`${ingredient?._id} ${index}`}
                                src={ingredient?.image_mobile} alt={ingredient?.name} />
                            <p className="text text_type_main-small">
                                1
                            </p>
                        </>)
                    } */}
                    {(() => {
                        const ingredientCounts: Record<string, number> = ingredients.reduce((acc, ingredient) => {
                            if (ingredient?._id) {
                                acc[ingredient._id] = ingredient.type !== 'bun' ? (acc[ingredient._id] || 0) + 1 : 0;
                            }
                            return acc;
                        }, {} as Record<string, number>);

                        const uniqueIngredients = ingredients.reduce((acc: typeof ingredients, ingredient) => {
                            if (!acc.find(item => item?._id === ingredient?._id)) {
                                acc.push(ingredient);
                            }
                            return acc;
                        }, []);

                        return uniqueIngredients.map((ingredient, index) => (
                            <div className={`${style.feedFooterImgContainer}`} key={ingredient?._id}>
                                <img
                                    style={{
                                        marginLeft: index !== 0 ? -15 : 0, zIndex: uniqueIngredients.length - index,
                                        opacity: ingredient && ingredientCounts[ingredient._id] > 1 ? 0.6 : 1
                                    }}
                                    className={style.feedFooterImg}
                                    src={ingredient?.image_mobile}
                                    alt={ingredient?.name}
                                />
                                {ingredient && ingredientCounts[ingredient._id] > 1 && (

                                    <p
                                        style={{ marginLeft: index !== 0 ? -10 : 0 }}
                                        className={`text text_type_main-small ${style.textOverlay}`}
                                    >
                                        +{ingredientCounts[ingredient._id]}
                                    </p>
                                )}
                            </div>
                        ));
                    })()}
                </div>
                <div className={style.feedFooterPrice}>
                    <p className="text text_type_main-small">
                        {totalPrice}
                    </p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    );
}