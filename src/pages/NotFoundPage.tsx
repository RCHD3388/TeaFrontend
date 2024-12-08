// src/components/NotFoundPage.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../app/store';
import { selectUser } from '../app/reducers/userSlice';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => selectUser(state));

  const handleBackButton = () => {
    if(user.loggedIn){
      navigate("/appuser")
    }else{
      navigate("/")
    }
  }

  return (
    <section className="bg-white flex items-center justify-center h-screen">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600">404</h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">Something's missing.</p>
          <p className="mb-4 text-lg font-light text-gray-500 ">Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
          <button className="btn btn-secondary" onClick={() => {handleBackButton()}}>Go Back</button>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;


