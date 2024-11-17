import React from 'react';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './pages.module.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../services/store';
import { resetPasswordUsers } from '../services/user/thunk';


export default function ResetPassword() {

  const dispatch = useAppDispatch();

  const [formUser, setFormUsers] = React.useState<{ password: string, token: string }>({ password: '', token: '' });
  const navigate = useNavigate();

  const email = sessionStorage.getItem('resetPasswordEmail');
  if (!email) {
    return <Navigate to="/forgotPassword" replace />;
  }

  const handelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(resetPasswordUsers(formUser)).then(() => {
      sessionStorage.removeItem('canResetPassword');
      navigate('/login', { replace: true });
    });
  }

  const onChangeInput = (key: string, value: string) => {
    setFormUsers({ ...formUser, [key]: value });
  }

  return (
    <main className={styles.mainContainer}>
      <div className={styles.loginContainer}>
        <form onSubmit={handelSubmit} className={`${styles.inputContainer} pb-20`}>
          <p className="text text_type_main-medium">
            Восстановление пароля
          </p>
          <PasswordInput
            placeholder={'Введите новый пароль'}
            icon={"ShowIcon"}
            name={'password'}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="ml-1"
            value={formUser.password}
            onChange={(event) => { onChangeInput('password', event.target.value) }}
          />
          <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            icon={undefined}
            name={'token'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="ml-1"
            value={formUser.token}
            onChange={(event) => { onChangeInput('token', event.target.value) }}
            onPointerEnterCapture={() => { }}
            onPointerLeaveCapture={() => { }}
          />
          <Button htmlType="submit" type="primary" size="medium">
            Сохранить
          </Button>
        </form>
        <div>
          <div className={`${styles.choice}`}>
            <p className="text text_type_main-default text_color_inactive">
              Вспомнили пароль?
            </p>
            <Link to='/login' className={`${styles.link} text text_type_main-default`}>
              Войти
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}