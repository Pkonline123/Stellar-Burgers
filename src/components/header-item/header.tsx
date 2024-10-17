import React from 'react';
import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyle from './header.module.css';

export default function Header() {
    return (
        <header>
            <nav className={headerStyle.title}>
                <div className={headerStyle.сontainer}>
                    <div style={{ color: 'white' }} className={`${headerStyle.menuItem} p-4`}>
                        <BurgerIcon type="primary" />
                        <p className="text text_type_main-default">
                            Конструктор
                        </p>
                    </div>

                    <div style={{ color: 'secondary' }} className={`${headerStyle.menuItem} p-4`}>
                        <ListIcon type="secondary" />
                        <p className="text text_type_main-default text_color_inactive">
                            Лента заказов
                        </p>
                    </div>
                </div>
                <div className={headerStyle.logoItem}>
                    <Logo />
                </div>
                <div style={{ color: 'secondary' }} className={`${headerStyle.menuItem} p-4`}>
                    <ProfileIcon type="secondary" />
                    <p className="text text_type_main-default text_color_inactive">
                        Личный кабинет
                    </p>
                </div>
            </nav>
        </header>
    );
}