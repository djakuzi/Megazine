import { useSelector } from 'react-redux';
import { OrderList } from '../../components/OrderList/OrderList';

import { RootState } from '../../redux/store';
import styles from './OrdersProfile.module.css';


export function OrdersProfile(){

    const orders = useSelector((s:RootState) => s.user.profile?.orders) ?? []


    return(
        <div className={styles.orders}>

            {!orders && < div style={{textAlign: 'center'}}>ВЫ НИЧЕГО НЕ ЗАКАЗЫВАЛИ</div>}
           <OrderList orders={orders}></OrderList>

   
        </div>
    )
}