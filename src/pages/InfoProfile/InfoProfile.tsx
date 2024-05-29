import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { axiosChangeProfile } from '../../redux/slices/user.slice';
import { AppDispatch, RootState } from '../../redux/store';
import styles from './InfoProfile.module.css';


interface ChangeUserParam{
    token?: string;
    id: number;
    email: string;
    nameUser: string;
    password?: string;
}

export function InfoProfile(){
    const dispatch = useDispatch<AppDispatch>()

    const nameUser = useSelector( (s:RootState) => s.user.profile?.nameUser)
    const emailUser = useSelector( (s:RootState) => s.user.profile?.email)
    const idUser = useSelector( (s:RootState) => s.user.profile?.id)

    const navigate = useNavigate()

    useEffect(()=>{
         
    },[nameUser, emailUser])

    const clickSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()

        const form = e.currentTarget
        const password = form.password.value
    

        let param: ChangeUserParam = {
            id: idUser as number,
            email: (form.email.value) ? form.email.value : emailUser,
            nameUser: (form.user.value) ? form.user.value : nameUser,
            
        }

        if(password){
            param.password = form.password.value
        }

        sendData(param)
        form.user.value = ''
        form.email.value = ''
        form.password.value = ''
        
    }

    const sendData = (param:ChangeUserParam) => {
          dispatch(axiosChangeProfile(param))
        
    }


    return(
        <div className={styles.info}>

            <form className={styles.form} onSubmit={ (e) => clickSubmit(e)}>

                <div className={styles['custom-input']}>
                    <label htmlFor="user">Ваше имя</label>
                    <input id='user' name="user" type='text' placeholder={nameUser}/>
                </div>

                <div className={styles['custom-input']}>
                    <label htmlFor="email">Ваш email</label>
                    <input id='email' name="email"  type='email' placeholder={emailUser}/>
                </div>

                <div className={styles['custom-input']}>
                    <label htmlFor="">Изменить пароль</label>
                    <input id='password' type="text"   placeholder="Новый пароль" />
                </div>


                <button className={styles['entrance']}>Изменить</button>

            </form>

        
        </div>
    )
}