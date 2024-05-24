import { useTransition } from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './Start.module.css';

export default function Start(){

   const navigate = useNavigate()
   const [isPending, startTransition] = useTransition()

   const clickStart = () => {
    
    localStorage.setItem('start', 'true')
    // startTransition( () =>  navigate('/megazine/show/menu') )
    navigate('/megazine/show/menu')

   }

    return (
        <>
        <div className={styles["start"]}>
            <div className={styles['link']} onClick={clickStart}>ВПЕРЕД ЗА ВКУСНЫМИ ДЕВАЙСАМИ</div>
        </div>
        </>
    )
}