import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { selectUser } from '../app/reducers/userSlice';

const PublicRoute: React.FC<{}> = ({}) => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => selectUser(state));

  useEffect(() => {
    if(user.loggedIn){
      navigate("/appuser")
    }
  }, [navigate, user])

  return <Outlet></Outlet>
};

export default PublicRoute;