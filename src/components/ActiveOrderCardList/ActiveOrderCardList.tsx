import OrderDeviceCard from '../OrderDeviceCard/OrderDeviceCard';
import styles from './ActiveOrderCardList.module.css';
import { ActiveOrderCardListProps } from './ActiveOrderCardList.props';
import cn from 'classnames';



export default function ActiveOrderCardList({order, activeCard, setActiveCard}:ActiveOrderCardListProps){


    return(
        <div className={ cn(styles.activeOrderCardList,{
                [styles.active]: !activeCard
            })} >

            {order.map( el => <OrderDeviceCard key={el.id + el.memory} order={el} setActiveCard={setActiveCard}></OrderDeviceCard>)}
        </div>
        
    )
}