import React, { useCallback } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import styles from './profile.module.css';
import { logoutUsers } from '../../services/user/thunk';
import { useAppDispatch } from '../../services/store';


export default function ProfileMenu() {

    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const authorization = localStorage.getItem('accessToken');

    const handleLogout = useCallback(() => {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
            dispatch(logoutUsers({ token: refreshToken })).then(() => {
                navigate('/login', { replace: true });
            });
        }
    }, [dispatch, navigate]);

    if (!authorization) {
        navigate('/login', { replace: true })
    }


    return (
        <section className={styles.menu}>
            <nav className={styles.navigation}>
                <NavLink
                    to='/profile'
                    className={`${styles.link} text text_type_main-medium text_color_inactive ${location.pathname === '/profile' &&
                        styles.link_active}`}>
                    Профиль
                </NavLink>
                <NavLink
                    to='/profile/orders'
                    className={`${styles.link} text text_type_main-medium text_color_inactive ${location.pathname === '/profile/orders' &&
                        styles.link_active}`}>
                    История заказов
                </NavLink>
                <button
                    className={`${styles.button} text text_type_main-medium text_color_inactive`} onClick={handleLogout}>
                    Выход
                </button>
            </nav>
            <span className="text text_type_main-default text_color_inactive mt-20">В этом разделе вы можете</span>
            {location.pathname === '/profile' ?
                <span className="text text_type_main-default text_color_inactive">изменить свои персональные данные</span>
                : <span className="text text_type_main-default text_color_inactive">просмотреть свою историю заказов</span>
            }
        </section>
    )
}