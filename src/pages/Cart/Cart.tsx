import CartCard from '../../components/CartCard/CartCard';
import styles from './Cart.module.css';
import cartIMG from '../../../public/cart/cart.svg'
import clearIMG from '../../../public/cart/clear.svg'

export default function Cart(){

    return(
        <div className={styles['cart']}>
            <div className={styles['header']}>

                <img src={cartIMG} alt="" />
                <div className={styles['title']}> Корзина</div>
                <div className={styles['container']}>
                    <img src={clearIMG} alt="" />
                    <div className={styles['clear']} onClick={()=> {}}>очистить корзину</div>
                </div>
            </div>
            
            <CartCard></CartCard>
            <CartCard></CartCard>

            <div  className={styles['info']}>
                <div className={styles['quantity']}>Всего девайсов <span> {3}шт.</span></div>
                <div className={styles['sum']}>Cумма заказа: <span>{300} ₽</span></div>
            </div>
        </div>
    )
}