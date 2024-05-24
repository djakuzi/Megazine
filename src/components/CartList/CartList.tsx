import { CartListProps } from "./CartList.props";
import styles from './CartList.module.css';
import CartDeviceCard from "../CartCard/CartCard";



export default function CartList({cartDevices}:CartListProps){


    return(
        <div className={styles.cartList}>

            {cartDevices.map( el => <CartDeviceCard {...el}></CartDeviceCard>)}
        </div>
        
    )
}