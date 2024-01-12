import { NavLink } from "react-router-dom";
import style from './LandingPage.module.css'


const LandingPage=()=>{
    return(
        <div className={style.background}>
            <button className={style.button}><NavLink to={'/home'}>Home Page</NavLink></button>
        </div>
    )
}

export default LandingPage