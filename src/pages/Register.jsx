import React, { useState } from 'react';
import axios from 'axios'
import { server } from '../main'
import toast from 'react-hot-toast'

function Register() {

    // const [Err, setErr] = useState();
    const [data, setData] = useState({
        username: "",
        password: ""
    });

    function handleChange({currentTarget: input}) {
        setData({...data, [input.name]: input.value})
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const {data: res} = await axios.post(`${server}/api/register`, data);
            toast.success(res.msg);
            // setErr(res.err);

        } catch (err) {
            console.error(err);
            if (err.response?.data?.err) {
                toast.error(err.response.data.err);
            } else {
                toast.error(err.message || "Failed! Please try again.");
            }
        }finally {
            setData({
                username: "",
                password: ""
            })
        }
        
    }
    return(
        <div className="Register">
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
                <button type="submit">Sign up</button>
            </form>
        </div>
        </div>
    )
}

export default Register