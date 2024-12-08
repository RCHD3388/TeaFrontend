import React from "react";
import { useDispatch } from "react-redux";
import { useRouteError, useNavigate } from "react-router-dom";
import { logoutUser } from "../app/reducers/userSlice";

const ErrorPage: React.FC = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoginButton = () => {
    dispatch(logoutUser());
    navigate("/login")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-secondary text-primary px-4">
      <h1 className="text-4xl font-bold mb-4">Oops! Terjadi Kesalahan</h1>
      <p className="text-lg mb-6">
        {error instanceof Error
          ? error.message
          : "Terjadi kesalahan yang tidak terduga. Silakan coba lagi."}
      </p>
      <div className="flex gap-4">
        <button
          className="px-6 py-2 text-secondary bg-primary font-semibold rounded shadow hover:bg-opacity-90"
          onClick={() => {handleLoginButton()}}
        >
          Ke Halaman Login
        </button>
        <button
          className="px-6 py-2 text-secondary bg-primary font-semibold rounded shadow hover:bg-opacity-90"
          onClick={() => window.location.reload()}
        >
          Coba Lagi
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
