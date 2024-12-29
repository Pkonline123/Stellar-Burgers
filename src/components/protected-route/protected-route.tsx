import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../../services/store';
import { getUserInfo } from '../../services/user/thunk';
import { PacmanLoader } from 'react-spinners';
import styles from './protected-route.module.css';

const getState = (store: RootState) => store.user.user;

export function ProtectedRoute({ element }: { element: JSX.Element }) {
    const user = useAppSelector(getState);
    const dispatch = useAppDispatch();
    const location = useLocation();
    const [isUserLoaded, setUserLoaded] = useState(false);

    useEffect(() => {
        dispatch(getUserInfo()).then(() => setUserLoaded(true));
    }, [dispatch]);

    if (!isUserLoaded) {
        return <div className={styles.protectedLoader}>
            <PacmanLoader color="#ffffff" />
        </div>;
    }

    return user ? (
        element
    ) : (
        <Navigate
            to="/login"
            replace
            state={{ from: location }}
        />
    );
}