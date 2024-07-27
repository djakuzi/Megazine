import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { axiosAuth} from '../../redux/slices/user.slice';
import { AppDispatch, RootState } from '../../redux/store';
import styles from './Login.module.css';



export default function Login(){

    const dispatch = useDispatch<AppDispatch>()
    const {token, errorLoginMessage} = useSelector( (s:RootState) => s.user)
    const navigate = useNavigate()

    useEffect( () =>{
        if(token) navigate('/show/menu')
    }, [token, navigate])
    
    const clickSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget
        const email: string = form.email.value
        const password: string = form.password.value
        sendLogin(email,password)
        
    }

     const sendLogin = async (email: string, password: string)=>{
        dispatch(axiosAuth({email,password}))
    }

    return(
        <div className={styles['login']}>

            <form className={styles.form} onSubmit={ (e) => clickSubmit(e)}>

                {errorLoginMessage && <>{errorLoginMessage}</>}
                <div className={styles['custom-input']}>
                    <label htmlFor="email">Ваш email</label>
                    <input id='email' name="email" type='email' placeholder="Email"/>
                </div>

                <div className={styles['custom-input']}>
                    <label htmlFor="">Ваш пароль</label>
                    <input id='password' name="password" type="password" placeholder="Пароль" />
                </div>

                <button className={styles['entrance']}>ВОЙТИ</button>

            </form>

             <div className={styles.question}>Нет аккаунта?</div>                
            <Link className={styles.link} to={'/auth/register'} >Зарегестрироваться</Link>
        </div>
    )
}