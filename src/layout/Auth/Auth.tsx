import { Outlet } from "react-router-dom";
import styles from './Auth.module.css';

export default function Auth(){

    return (
        <div className={styles.auth}>
            <Outlet></Outlet>
        </div>
    )
}