import { CartListProps } from "./CartList.props";
import styles from './CartList.module.css';
import CartDeviceCard from "../CartCard/CartDeviceCard";



export default function CartList({cartDevices}:CartListProps){


    return(
        <div className={styles.cartList}>

            {cartDevices.map( el => <CartDeviceCard key={el.id + el.memory} {...el}></CartDeviceCard>)}
        </div>
        
    )
}