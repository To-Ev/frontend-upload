import { Link } from "react-router-dom"
import styles from './styles.module.css'
import { server } from '../main'
import React, {useState} from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';
import '../assets/style.css'

function Header() {

    const [menuOpen, setMenuOpen] = useState(false);

    async function handleClick(e) {
        e.preventDefault();
        try {
           const {data:res} = await axios.get(`${server}/api/logout`, {withCredentials: true});
           toast.success(res.msg)
           sessionStorage.removeItem('token');
        } catch (err) {
            console.error(err);
            if (err.response?.data?.err) {
                toast.error(err.response.data.err);
            } else {
                toast.error(err.message || "Failed! Please try again.");
            }
        }
        
    }
    return(
        <div>
            <nav className={styles.nav_bar} >
                <div className={styles.logo}><i className="icon-one-concept-logo-2"></i></div>
                <div className={styles.menu} onClick={()=>{
                    setMenuOpen(!menuOpen)}}>
                   <i class='bx bx-menu-alt-right'></i>
                </div>
                <span className={ menuOpen ? styles.open : "" }>
                    <Link to="/">Uploads</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/" onClick={handleClick}>Logout</Link>
                </span>
                
            </nav>
        </div>
    )
}

export default Header