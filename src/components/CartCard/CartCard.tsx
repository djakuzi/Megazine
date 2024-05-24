import styles from './CartCard.module.css';
import minusIMG from '../../../public/cart/minus.svg'
import plusIMG from '../../../public/cart/plus.svg'
import deleteIMG from '../../../public/cart/delete.svg'
import { CartDeviceCardProps } from './CartDeviceCard.props';

export default function CartDeviceCard(props:CartDeviceCardProps){


    return(
        <div>
             <hr className={styles['line']}/>

            <div className={styles['cart']}>

                <div style={{backgroundImage: `url(${props.image})`}} className={styles['img']}></div>

                <div className={styles['box']}>

                    <div className={styles['container']} >
                        <div className={styles['name']}>{props.name}</div>
                        <div className={styles['memory']}>{props.memory}</div>
                    </div>


                    <div className={styles['wrapper']}>
                        <div className={styles['action']}>
                            <img src={minusIMG} alt="убавить количество" />
                            <div className={styles['count']}>{2}</div>
                            <img src={plusIMG} alt="прибавить количество" />
                        </div>

                        <div className={styles['price']}>{props.price}&nbsp;₽</div>

                        <img className={styles['delete']} src={deleteIMG} alt="удалить" />

                    </div>
                </div>
                
            </div>
        </div>
    )
}