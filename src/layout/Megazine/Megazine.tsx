import { useEffect } from 'react';
import { Outlet, useNavigate} from 'react-router-dom';
import styles from './Megazine.module.css';
import backgroundIMG from '../../../public/megazine/background.png'

export default function Megazine(){

    const navigate = useNavigate()

    useEffect( () =>{
        checkedStart()
    }, [])

    const checkedStart = () => {

        const data = localStorage.getItem('start')

        if (!data) {
            navigate('/Megazine/start')
        } else if (data)(
            navigate('/Megazine/show/menu')
        )
    }

    return (
        <>
        <div style={{backgroundImage: `url("${backgroundIMG}")`}} className={styles["megazine"]}>
            <Outlet></Outlet>
        </div>
        </>
    )
}