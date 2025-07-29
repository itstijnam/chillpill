import React from 'react'
import './Login.scss'
import { useState } from 'react'
import bgImage from '/images/bgImage.png';
import axios from 'axios'
import { baseUrl } from '../../utils/baseUrl';
import { useNavigate } from 'react-router-dom';
import { setAuthUser } from '../../redux/authSlice';
import { useDispatch, useSelector } from "react-redux";


function Login() {

    const [popUpMessage, setPopUpMessage] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const res = await axios.post(`${baseUrl}/user/login`, { username, password }, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            })

            if (res.data.success) {
                setUsername('');
                setPassword('');
                setPopUpMessage(res.data.message);
                dispatch(setAuthUser(res.data.user));
                navigate('/')
            }
            else {
                setPopUpMessage(res.data.message);
            }

        } catch (error) {
            setPopUpMessage(error?.response?.data?.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='loginPage' style={{ backgroundImage: `url(${bgImage})` }} >
            <div className="login_caontainer">

                <div className="page_heading">
                    <h1>Welcome</h1>
                    <p>Login to experience ease</p>
                </div>
                <form onSubmit={handleLogin} className='loginForm'>
                    {/* {popUpMessage && <p>{popUpMessage}</p> } */}
                    <input type="text" name='freelanceSocialMedia' className='' placeholder='User-name' value={username} onChange={(e) => { setUsername(e.target.value) }} />
                    <input type="password" name='password' className='' placeholder='Password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    {
                        popUpMessage &&
                        <p className='errorPopup'>{popUpMessage}</p>
                    }
                    <button type='submit' className='loginBtn'>Login</button>
                </form>
                <strong 
                    onClick={()=>navigate(-1)}
                className='backtohome' >
                    home
                </strong>
            </div>
        </div>
    )
}

export default Login