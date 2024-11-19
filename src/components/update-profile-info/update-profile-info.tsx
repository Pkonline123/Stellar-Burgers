import React, { useEffect, useState } from 'react';
import styles from './update-profile-info.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { RootState, useAppDispatch, useAppSelector } from '../../services/store';
import { updateUserInfo } from '../../services/user/thunk';

const getUserName = (store: RootState) => store.user.user?.name || '';
const getUserEmail = (store: RootState) => store.user.user?.email || '';

export default function UpdateProfileForm() {

    const dispatch = useAppDispatch();
    const userName = useAppSelector(getUserName);
    const userEmail = useAppSelector(getUserEmail);

    const [value, setValue] = useState({
        name: userName,
        email: userEmail,
        password: ''
    })

    useEffect(() => {
        setValue({
            name: userName,
            email: userEmail,
            password: ''
        })
    }, [userName, userEmail])


    const handelSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(updateUserInfo({
            name: value.name,
            email: value.email,
            password: value.password || undefined
        }));
    }

    const cancelEditing = () => {
        setValue({
            name: userName,
            email: userEmail,
            password: ''
        })
    }

    return (
        <form className={styles.form} onSubmit={handelSubmit}>
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={(evt) => setValue({ ...value, name: evt.target.value })}
                value={value.name}
                name={'name'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                icon="EditIcon"
                onPointerEnterCapture={() => { }}
                onPointerLeaveCapture={() => { }}
            />
            <Input
                type={'email'}
                placeholder={'Логин'}
                onChange={(evt) => setValue({ ...value, email: evt.target.value })}
                value={value.email}
                name={'email'}
                icon="EditIcon"
                extraClass="mt-6"
                onPointerEnterCapture={() => { }}
                onPointerLeaveCapture={() => { }}
            />
            <Input
                type={'password'}
                placeholder={'Пароль'}
                onChange={(evt) => setValue({ ...value, password: evt.target.value })}
                value={value.password}
                name={'password'}
                icon="EditIcon"
                extraClass="mt-6"
                onPointerEnterCapture={() => { }}
                onPointerLeaveCapture={() => { }}
            />
            <div className={`${styles.choice} mt-6`}>
                <Button type="secondary" size="medium" htmlType="reset" extraClass="pr-7" onClick={cancelEditing}>Отмена</Button>
                <Button type="primary" size="medium" htmlType="submit">Сохранить</Button>
            </div>
        </form>
    )
}