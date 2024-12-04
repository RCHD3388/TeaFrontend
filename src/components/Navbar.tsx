import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser, selectUser } from "../app/reducers/userSlice";
import { RootState } from "../app/store";

interface NavbarProps{
  sidebarID: string
}

const Navbar: React.FC<NavbarProps> = ({sidebarID}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => selectUser(state))

  function logoutHandling() {
    dispatch(logoutUser());
    navigate("/");
  }

  useEffect(() => {
    if (user.loggedIn == false) {
      navigate("/")
    }
  }, [user])

  return (
    <>
      <div className="navbar bg-light shadow-lg h-16">
        <div className="flex-1">
          <label htmlFor={sidebarID} className="btn btn-primary drawer-button lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-5 w-5 stroke-current">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </label>
          <img className="w-14" src="/images/company_logo.png" alt="Logo"></img>
          <div className="text-center font-bold ms-2">
            <p className="leading-none">Dream</p>
            <p className="leading-none">Home</p>
          </div>
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar placeholder">
              <div className="bg-secondary text-secondary-content w-12 rounded-full">
                <span>{user.username?.toUpperCase()[0]}{user.username?.toUpperCase()[1]}</span>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <p className="font text-base">{user.username}</p>
              <p className="font-bold text-sm">{user.role}</p>
              <hr className="my-2 border-t-2 border-gray-300" />
              <li className="btn bg-important btn-sm" onClick={() => { logoutHandling() }}>Logout</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar;