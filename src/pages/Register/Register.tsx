import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { axiosRegister } from '../../redux/slices/user.slice';
import { AppDispatch, RootState } from '../../redux/store';
import styles from './Register.module.css';



export default function Register(){

    const dispatch = useDispatch<AppDispatch>()
    const {token, errorRegiserMessage} = useSelector( (s:RootState) => s.user)
    const navigate = useNavigate()

    useEffect( () =>{
        if(token) navigate('/show/menu')
    }, [token, navigate])


    const clickSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget
        const email = form.email.value
        const password = form.password.value
        const nameUser = form.user.value

        sendData(email,password,nameUser)
    }


    const sendData =  async(email: string, password: string, nameUser: string) => {

        dispatch(axiosRegister({email, password, nameUser}))

    }

    return(
        <div className={styles['login']}>

            <form className={styles.form} onSubmit={ (e) => clickSubmit(e)}>

                {errorRegiserMessage && <>{errorRegiserMessage}</>}

                <div className={styles['custom-input']}>
                    <label htmlFor="user">Ваше имя</label>
                    <input id='user' name="user" type='text' placeholder="Имя"/>
                </div>

                <div className={styles['custom-input']}>
                    <label htmlFor="email">Ваш email</label>
                    <input id='email' name="email" type='email' placeholder="Email"/>
                </div>

                <div className={styles['custom-input']}>
                    <label htmlFor="">Придумайте пароль</label>
                    <input id='password' name="password" type="password" placeholder="Пароль" />
                </div>


                <button className={styles['entrance']}>ЗАРЕГИСТРИРОВАТЬСЯ</button>

            </form>

             <div className={styles.question}>Есть аккаунт?</div>                
            <Link className={styles.link} to={'/auth/login'} >Войти</Link>
        </div>
    )
}