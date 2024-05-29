import { useState } from "react";
import { Order} from "../../redux/slices/user.slice";
import ActiveOrderCardList from "../ActiveOrderCardList/ActiveOrderCardList";
import styles from './OrderCard.module.css';
import cn from 'classnames';

export function OrderCard({order}:{order: Order}){

    const [activeCard, setActiveCard] = useState<boolean>(false)

    return (
        <div className={styles.orderList}>

            <div className={ cn(styles.orderInfo,{
                [styles.active]: activeCard
            })} onClick={ ()=> setActiveCard(!activeCard)}>
                <div>Номер заказа {order.idOrder}</div>
                <div>Дата заказа {order.date}</div>
                <div>Сумма {order.calculator.price}</div>
            </div>

            <ActiveOrderCardList activeCard={activeCard} setActiveCard={setActiveCard} order={order.order}></ActiveOrderCardList>
        </div>
    )
}