import styles from './CartDeviceCard.module.css';
import minusIMG from '../../../public/cart/minus.svg'
import plusIMG from '../../../public/cart/plus.svg'
import deleteIMG from '../../../public/cart/delete.svg'
import { CartDeviceCardProps } from './CartDeviceCard.props';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { cartActions } from '../../redux/slices/cart.slice';

export default function CartDeviceCard(props:CartDeviceCardProps){

    const dispatch = useDispatch<AppDispatch>() 

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
                            <img onClick={ () => dispatch(cartActions.decrease({ id: props.id, memory: props.memory}))} src={minusIMG} alt="убавить количество" />
                            <div className={styles['count']}>{props.count}</div>
                            <img onClick={ () => dispatch(cartActions.increase({ id: props.id, memory: props.memory}))} src={plusIMG} alt="прибавить количество" />
                        </div>

                        <div className={styles['price']}>{props.price}&nbsp;₽</div>

                        <img onClick={ () => dispatch(cartActions.delete({ id: props.id, memory: props.memory}))} className={styles['delete']} src={deleteIMG} alt="удалить" />

                    </div>
                </div>
                
            </div>
        </div>
    )
}