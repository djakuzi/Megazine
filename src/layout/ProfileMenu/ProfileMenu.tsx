import { NavLink, Outlet, useNavigate } from "react-router-dom";
import styles from './ProfileMenu.module.css';
import cn from 'classnames';
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/slices/user.slice";
import { useEffect } from "react";

export function ProfileMenu(){

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()


    useEffect( ()=>{
      navigate("/Megazine/show/profile/infoProfile")
    },[])

    const clickExit = () =>{
        dispatch(userActions.logOut())
        navigate('/Megazine/auth/login')
        localStorage.setItem('start', '')
    }
    
    return(
        <div className={styles.profile}>

            <div className={styles.menu}>
                <NavLink className={ ({isActive}) => cn(styles['link'],{
                        [styles.active]: isActive,
                    })} to="/Megazine/show/profile/infoProfile">
                    Профиль
                </NavLink>

                <NavLink className={ ({isActive}) => cn(styles['link'],{
                        [styles.active]: isActive,
                    })} to="/Megazine/show/profile/orders">
                    Заказы
                </NavLink>

                <button onClick={ () => clickExit()} className={styles.exit}>
                    ВЫХОД
                </button>
            </div>

            <div className={styles.content}>
                <Outlet></Outlet>
            </div>
        </div>
    )
}