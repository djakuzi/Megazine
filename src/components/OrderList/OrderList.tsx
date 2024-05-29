import { Order } from "../../redux/slices/user.slice";
import { OrderCard } from "../OrderCard/OrderCard";
import styles from './OrderList.module.css';


export function OrderList({orders}:{orders: Order[]}){

   

    return (
        <div className={styles.orderList}>

            {
                ...orders.map( (el) => {
                    return <OrderCard order={el}></OrderCard>
                })
            }

        </div>
    )
}