//  implement the home page UI here.
import React from 'react'
import {Link} from 'react-router-dom';
// compoents imports
import Login from '../components/Login'
import Register from '../components/Register'
import Courses from '../components/Courses'
import logo from '../../assets/logo.png'

const Home = () => {
  return (
    //  write home page UI code here
    <div>
    <div className="top-0 left-0 w-full z-50 bg-white border-b backdrop-blur-lg bg-opacity-80">
    <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8 ">
        <div className="relative flex h-16 justify-between">
            <div className="flex flex-1 items-stretch justify-start">
                <a className="flex flex-shrink-0 items-center" href="#">
                    <img className="block h-12 w-auto" src={logo} />
                    <h1 className='text-indigo-700 font-bold ml-4'>Coursify</h1>
                </a>
            </div>
            <div className="flex-shrink-0 flex px-2 py-3 items-center space-x-8">
                <Link className="text-gray-700 hover:text-indigo-700 text-sm font-medium" to="/login">Login</Link>
                <Link className="text-gray-800 bg-indigo-100 hover:bg-indigo-200 inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm " to="/register">Register
                </Link>
            </div>
        </div>
    </div>
</div>
<div className='mt-10'>
<h1 className='text-indigo-700 text-3xl text-center font-bold'>Welcome to Coursify</h1>
</div>
<h2 className="text-2xl font-semibold text-center mt-6">Courses</h2>
        <Courses />
</div>
  
  )
}

export default Home