import React from "react";

const Navbar: React.FC = () => {
  return (
    <>
      <div className="navbar bg-light shadow-lg">
        <div className="flex-1">
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
                <span>RI</span>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <p className="font text-base">Richard Rafer Guy</p>
              <p className="font-bold text-sm">Admin</p>
              <hr className="my-2 border-t-2 border-gray-300" />
              <li className="btn bg-important btn-sm">Logout</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar;