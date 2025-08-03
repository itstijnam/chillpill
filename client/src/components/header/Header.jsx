import React from 'react';
import './Header.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { baseUrl } from '../../utils/baseUrl';
import { setAuthUser } from '../../redux/authSlice';


function Header() {

  const { user } = useSelector(store => store.auth)
  // console.log(user)

  const isAdmin = user?._id?.toString() === "6887a72961297d74aaeb7025";

  console.log(isAdmin)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`${baseUrl}/user/logout`);
      if (res.data.success) {
        dispatch(setAuthUser(null));
      }
    } catch (error) {

    }
  }

  const navBar = [
    {
      text: 'Home',
      url: ''
    },
    {
      text: 'Movies',
      url: 'm/movies'
    },
    // {
    //   text: 'Cartoons',
    //   url: 'm/cartoons'
    // },
    // {
    //   text: 'Animations',
    //   url: 'm/animations'
    // },
  ]

  return (
    <div className='Header'>
      <div className="Header_left">
        <div className="logo">
          {/* <img src="/logo.png" alt="" /> */}
          <h1>Chill pill</h1>
        </div>

        <div className="header_navbar">
          <ul>
            {navBar?.map((n, i) => (
              <li onClick={() => navigate(n?.url)} key={i} >{n?.text}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="Header_right">
        <div className="search_box">
          <input type="text" placeholder="Search..." />
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </button>
        </div>

        {/* notification display is none  */}

        <div className="notification_icon">
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
            </svg>
          </button>
        </div>

        {isAdmin ?
          <>
            <div className="add_icon">
              <button onClick={() => navigate('add')} >
                Add +
              </button>
            </div>

            {user ?
              <div className="login_button">
                <button onClick={logoutHandler} >Logout</button>
              </div> :
              <div className="login_button">
                <button onClick={() => navigate('/login')} >Login</button>
              </div>

            }
          </> :
          <div className="login_button">
            <button>𝄞</button>
          </div>
        }

      </div>
    </div>
  );
}

export default Header;