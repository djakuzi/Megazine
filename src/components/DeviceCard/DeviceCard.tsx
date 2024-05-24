import { useState } from 'react';
import styles from './DeviceCard.module.css';
import { DeviceCardProps } from './DeviceCard.props';
import { MemoryPriceProps } from './MemoryPrice.props';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { cartActions } from '../../redux/slices/cart.slice';

export default function DeviceCard(props:DeviceCardProps){

    const [price, setPrice] = useState<number>(props.memoryPrice[0].price)
    const dispatch = useDispatch<AppDispatch>()

    return (
        <div className={styles['card']}>
            <div style={{backgroundImage: `url(${props.image})`}} className={styles['image']}></div>
            <div className={styles['name']}>{props.name}</div>
            <div className={styles['color']}>{props.color}</div>
            <div className={styles['characteristics']}></div>
            <div className={styles['memoryPrice']}>
                {props.memoryPrice.map( (el:MemoryPriceProps, i)  => <div key={i} className={ cn(styles["memoryPrice__item"], {[styles.active]: el.price == price})} onClick={()=> setPrice(el.price)}> <div>{el.memory}</div></div>)}
            </div>
           
           <div className={styles['container']}>
             <div className={styles['price']}>{price}&nbsp;₽</div>
             <div onClick={()=> dispatch(cartActions.add( {id: props.id, memory: props.memoryPrice.filter( el => el.price == price)[0].memory} ))} className={styles['addCart']}>Добавить</div>
           </div>
        </div>
    )
}