import { useSelector } from 'react-redux';
import { OrderList } from '../../components/OrderList/OrderList';
import { Order } from '../../redux/slices/user.slice';
import { RootState } from '../../redux/store';
import styles from './OrdersProfile.module.css';


export function OrdersProfile(){

    const orders = useSelector((s:RootState) => s.user.profile?.orders) as Order[]


    return(
        <div className={styles.orders}>

           
           <OrderList orders={orders}></OrderList>

   
        </div>
    )
}