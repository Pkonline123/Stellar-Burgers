import React from 'react';
import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyle from './header.module.css';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className={headerStyle.headerBackground}>
            <nav className={headerStyle.title}>
                <div className={headerStyle.сontainer}>
                    <Link to="/" className={headerStyle.constructorLink}>
                        <div className={`${headerStyle.menuItem} p-4`}>
                            <BurgerIcon type="primary" />
                            <p className="text text_type_main-default">
                                Конструктор
                            </p>
                        </div>
                    </Link>

                    <div className={`${headerStyle.menuItem} p-4`}>
                        <ListIcon type="secondary" />
                        <p className="text text_type_main-default text_color_inactive">
                            Лента заказов
                        </p>
                    </div>

                </div>
                <Link to={"/"}>
                    <div className={headerStyle.logoItem}>
                        <Logo />
                    </div>
                </Link>
                <Link to="/profile" className={headerStyle.profileLink}>
                    <div className={`${headerStyle.menuItem} p-4`}>
                        <ProfileIcon type="secondary" />
                        <p className="text text_type_main-default text_color_inactive">
                            Личный кабинет
                        </p>
                    </div>
                </Link>
            </nav>
        </header>
    );
}