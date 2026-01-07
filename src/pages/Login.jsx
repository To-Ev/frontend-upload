import React, { useState } from 'react';
import axios from 'axios'
import { server } from '../main'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

function Login() {

    const [data, setData] = useState({
        username: "",
        password: ""
    })

    function handleChange({currentTarget: input}) {
        setData({...data, [input.name]: input.value})
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const {data: res} = await axios.post(`${server}/api/login`, data, {withCredentials: true});
            toast.success(res.msg);

            // store token
            sessionStorage.setItem(`token`, res.accessToken);

        } catch (err) {
            console.error(err);
            toast.error(err.response.data.err);
            // toast.error(Err);
        }finally{
            setData({
                username: "",
                password: ""
            })
        }
        
    }

    return(
        <div className="container">
            
            <form onSubmit={handleSubmit} className="form">
                <input type="text" 
                    name="username" 
                    placeholder="Username" 
                    value={data.username}
                    onChange={handleChange}
                />
                <input type="password" 
                    name="password" 
                    placeholder="Password" 
                    value={data.password}
                    onChange={handleChange}
                />
                <div className={styles.sign}>
                    <p>Don't have an account?</p>
                    <Link to="/register" >Sign up</Link>
                </div>
                <button type="submit">Login</button>
                
            </form>
        </div>
    )
}

export default Login