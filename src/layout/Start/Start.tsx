import {useNavigate} from 'react-router-dom';
import styles from './Start.module.css';

export default function Start(){


   const navigate = useNavigate()


   const clickStart = () => {
    
    localStorage.setItem('start', 'true')
    navigate('/show/menu')
    window.scrollTo(0,0)
     
   }

    return (
        <>
        <div className={styles["start"]}>
            <div className={styles['link']} onClick={clickStart}>ВПЕРЕД ЗА ВКУСНЫМИ ДЕВАЙСАМИ</div>
        </div>
        </>
    )
}