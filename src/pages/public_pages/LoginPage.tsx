import React from 'react';

const LoginPage: React.FC = () => {
  return (
    <div className="h-screen flex flex-col md:flex-row">
      {/* Bagian Kiri (3/5) - Tersembunyi di layar kecil */}
      <div className="hidden md:block md:w-6/10 bg-primary p-14 ">
        <div className='flex flex-col justify-center h-full'>
          <h1 className="text-5xl font-bold text-primary-content">Welcome to Dream Home Admin Dashboard</h1>
          <p className="py-6 text-base-content">
            Manage your construction and renovation task with efficiency and transparency.
            This dashboard helps you  ensure every detail is executed to perfection.
            We build your dream homes with the highest quality.
            Log in to access the project management system.
          </p>
        </div>
      </div>

      {/* Bagian Kanan (2/5 pada layar besar, full width di layar kecil) */}
      <div className="flex flex-col justify-center w-full h-full md:w-4/10 bg-secondary p-12">
        <div className='block md:hidden mb-4'>
          <h1 className="text-2xl font-bold text-secondary-content">Welcome to Dream Home Admin Dashboard</h1>
          <p className="py-6 text-secondary-content">
            Manage your construction and renovation task with efficiency and transparency.
            Please log in to access the project management system.
          </p>
        </div>
        <div className="card bg-base-100 shadow-2xl">
          <form className="card-body p-6">
            <div>
              <h1 className="text-2xl font-bold text-primary-content">Login Here</h1>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70">
                  <path
                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input type="text" className="grow" placeholder="Username" />
              </label>
            </div>
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <div className="form-control">
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70">
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd" />
                </svg>
                <input type="password" className="grow" value="password" />
              </label>
            </div>
            <div className="form-control">
              <div className='flex items-center justify-start'>
                <div className="flex space-x-4">
                  <input type="checkbox" defaultChecked className="checkbox checkbox-primary" />
                  <span className="label-text">Remember me</span>
                </div>
              </div>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
