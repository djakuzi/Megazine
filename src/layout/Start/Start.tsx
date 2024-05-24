import {useNavigate} from 'react-router-dom';
import styles from './Start.module.css';

export default function Start(){

   const navigate = useNavigate()

   const clickStart = () => {
    
    localStorage.setItem('start', 'true')
    // startTransition( () =>  navigate('/Megazine/show/menu') )
    navigate('/Megazine/show/menu')

   }

    return (
        <>
        <div className={styles["start"]}>
            <div className={styles['link']} onClick={clickStart}>ВПЕРЕД ЗА ВКУСНЫМИ ДЕВАЙСАМИ</div>
        </div>
        </>
    )
}