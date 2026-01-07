import React, {useState, useEffect} from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import { server } from './main.jsx';
import toast from 'react-hot-toast';

function Upload(){
    const [data, setData] = useState({
        title: "",
        description: "",
        projectType: "",
        liveURL: "",
        files: []
    })
    const [Token, setToken] = useState();
    
    const api = axios.create({ 
        baseURL: server, 
        headers: { Authorization: `Bearer ${Token}` },
        withCredentials: true 
    });

    useEffect(() => { 
        const fetchToken = async () => { 
            try { 
                const token = sessionStorage.getItem(`token`);
                setToken(token);
            } catch (err) { 
                console.error("Refresh failed", err); 
            } 
        }; 
        document.title = "Making One";
        fetchToken(); 
    }, []);
    
    // console.log("Access Token:", Token);

// interceptor triggers only when accessToken expires 
    api.interceptors.response.use( response => 
        response, async error => { 
            const originalRequest = error.config; 
            if (error.response?.status === 401 && !originalRequest._retry) { 
                originalRequest._retry = true; 

                //call your refresh endpoint 
                const {data: res} = await api.get(`/api/refresh`); 
                setToken(res.accessToken);

                originalRequest.headers['Authorization'] = `Bearer ${res.accessToken}`;
                return api(originalRequest); //retry the original request 
            } 
            return Promise.reject(error); 
        } 
    );
   
    function handleChange(e){
        const { name, type, files, value} = e.target;

        setData({...data, 
            [name]: type === 'file' ? Array.from(files) : value
        })
    }

    async function handleSubmit(e){
        e.preventDefault();
        const formData = new FormData()

        try{
            formData.append('title', data.title);
            formData.append('description', data.description);
            formData.append('projectType', data.projectType);
            formData.append('liveURL', data.liveURL);
            // Appending multiple files separately
            data.files.forEach(file => { 
                formData.append("files", file); 
            });

            const {data:res} = await api.post(`api/uploads`, formData);
            toast.success(res.msg);
            
        }catch(err) {
            console.error(err)
            toast.error(err.response?.data?.err || "Upload failed");
        }finally{
            // Clear input field after submit
            setData({
                title: "",
                description: "",
                projectType: "",
                liveURL: "",
                files: []
            });
        }
    }

    return(
        <div className="container">
            <form onSubmit={handleSubmit} className="form">
                {/* <img src="../one-concept-logo.svg" alt="" /> */}
                <label htmlFor="input-file" className="input-label">
                    <i class='bx bxs-file-image' ></i>
                    Chose file
                </label>
                <input 
                    name="files"
                    id="input-file"
                    type="file" 
                    multiple
                    onChange={handleChange}
                />
                <select name="projectType" id="type" value={data.projectType} onChange={handleChange}>
                    <option >ProjectType</option>
                    <option value="Graphics Design">Graphics Design</option>
                    <option value="Web Development">Web Development</option>
                </select>
                <input 
                    type="text" 
                    name="title"
                    value={data.title}
                    onChange={handleChange}
                    placeholder="Title"
                />
                <input 
                    type="text" 
                    name="liveURL"
                    value={data.liveURL}
                    onChange={handleChange}
                    placeholder="liveURL"
                />
                <textarea 
                    type="text" 
                    name="description"
                    value={data.description}
                    onChange={handleChange}
                    placeholder="Description"
                />
                <button type="submit" className="btn">Upload</button>
            </form>
        </div>
    )
}

export default Upload