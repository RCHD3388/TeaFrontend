import React from 'react';
import { Navigate } from 'react-router-dom';
import UserLayout from '../layouts/UserLayout';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { selectUser } from '../app/reducers/userSlice';

const PrivateRoute: React.FC<{}> = ({}) => {
  const user = useSelector((state: RootState) => selectUser(state))
  return user.loggedIn == true ? <UserLayout/> : <Navigate to="/" />
};

export default PrivateRoute;