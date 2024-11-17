import React from 'react';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './pages.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../services/store';
import { loginUsers } from '../services/user/thunk';

export default function Login() {

  const [formUser, setFormUsers] = React.useState<{ name: string, email: string, password: string }>({ name: '', email: '', password: '' });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUsers(formUser)).then(() => {
      navigate('/', { replace: true });
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
            Вход
          </p>
          <EmailInput
            placeholder={'E-mail'}
            name={'email'}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="ml-1"
            value={formUser.email}
            onChange={(event) => {onChangeInput('email', event.target.value) }}
          />
          <PasswordInput
            placeholder={'Пароль'}
            icon={"ShowIcon"}
            name={'name'}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="ml-1"
            value={formUser.password}
            onChange={(event) => {onChangeInput('password', event.target.value)}}
          />
          <Button htmlType="submit" type="primary" size="medium">
            Войти
          </Button>
        </form>
        <div>
          <div className={`${styles.choice} mb-4`}>
            <p className="text text_type_main-default text_color_inactive">
              Вы — новый пользователь?
            </p>
            <Link to='/register' className={`${styles.link} text text_type_main-default`}>
              Зарегистрироваться
            </Link>
          </div>
          <div className={styles.choice}>
            <p className="text text_type_main-default text_color_inactive">
              Забыли пароль?
            </p>
            <Link to='/forgotPassword' className={`${styles.link} text text_type_main-default`}>
              Восстановить пароль
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}