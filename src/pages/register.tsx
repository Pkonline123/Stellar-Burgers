import React from 'react';
import { EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './pages.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../services/store';
import { registrationUsers } from '../services/user/thunk'

export default function Register() {

  const dispatch = useAppDispatch();

  const [formUser, setFormUsers] = React.useState<{ name: string, email: string, password: string }>({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registrationUsers(formUser)).then(() => {
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
            Регистрация
          </p>
          <Input
            type={'text'}
            placeholder={'Имя'}
            icon={undefined}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="ml-1"
            value={formUser.name}
            onChange={(event) => onChangeInput('name', event.target.value)}
            onPointerEnterCapture={()=> {}}
            onPointerLeaveCapture={()=> {}}
          />
          <EmailInput
            placeholder={'E-mail'}
            name={'email'}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="ml-1"
            value={formUser.email}
            onChange={(event) => onChangeInput('email', event.target.value)}
          />
          <PasswordInput
            placeholder={'Пароль'}
            icon={"ShowIcon"}
            name={'password'}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="ml-1"
            value={formUser.password}
            onChange={(event) => onChangeInput('password', event.target.value)}
          />
          <Button htmlType="submit" type="primary" size="medium">
            Зарегистрироваться
          </Button>
        </form>
        <div>
          <div className={`${styles.choice}`}>
            <p className="text text_type_main-default text_color_inactive">
              Уже зарегистрированы?
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