import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../../services/store';
import { getUserInfo } from '../../services/user/thunk';

const getState = (store: RootState) => store.user.user;

export function ProtectedRoute({ element }: { element: JSX.Element }) {

    const user = useAppSelector(getState);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getUserInfo()).then(() => setUserLoaded(true));
    }, [dispatch])

    const [isUserLoaded, setUserLoaded] = useState(false);

    if (!isUserLoaded) {
        return null;
    }

    return user ? element : <Navigate to="/login" replace />;
}