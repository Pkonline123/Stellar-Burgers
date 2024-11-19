import React from 'react';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './pages.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { forgotPasswordUsers } from '../services/user/thunk';
import { useAppDispatch } from '../services/store';

export default function ForgotPassword() {
  const [formUser, setFormUsers] = React.useState<{ email: string }>({ email: '' });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(forgotPasswordUsers(formUser)).then((response: any) => {
      if (response.payload && response.payload.success) {
        sessionStorage.setItem('resetPasswordEmail', formUser.email);
        navigate('/resetPassword', { replace: true });
      }
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
          <EmailInput
            placeholder={'E-mail'}
            name={'email'}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="ml-1"
            value={formUser.email}
            onChange={(event) => { onChangeInput('email', event.target.value) }}
          />
          <Button htmlType="submit" type="primary" size="medium">
            Восстановить
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