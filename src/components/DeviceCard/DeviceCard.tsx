import { useState } from 'react';
import styles from './DeviceCard.module.css';
import { DeviceCardProps } from './DeviceCard.props';
import { MemoryPriceProps } from './MemoryPrice.props';
import cn from 'classnames';

export default function DeviceCard(props:DeviceCardProps){

    const [price, setPrice] = useState<number>(props.memoryPrice[0].price)


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
             <div className={styles['price']}>{price + ' ₽'}</div>
             <div className={styles['addCart']}>Добавить</div>
           </div>
        </div>
    )
}