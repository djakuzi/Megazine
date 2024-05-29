import styles from './OrderDeviceCard.module.css';
import { OrderDeviceCardProps } from './OrderDeviceCard.props';


export default function OrderDeviceCard({order}:OrderDeviceCardProps){



    return(
        <div>
             <hr className={styles['line']}/>

            <div className={styles['cart']}>

                <div style={{backgroundImage: `url(${order.image})`}} className={styles['img']}></div>

                <div className={styles['box']}>

                    <div className={styles['container']} >
                        <div className={styles['name']}>{order.name}</div>
                        <div className={styles['memory']}>{order.memory}</div>
                    </div>


                    <div className={styles['wrapper']}>
                        <div className={styles['count']}>Количество: {order.count}</div>

                        <div className={styles['price']}> Цена: {order.price}&nbsp;₽</div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}