import styles from './Cart.module.css';
import cartIMG from '../../../public/cart/cart.svg'
import clearIMG from '../../../public/cart/clear.svg'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import axios from 'axios';
import PREFIX from '../../helper/PREFIX';
import { useEffect, useState } from 'react';
import { DeviceCardProps } from '../../components/DeviceCard/DeviceCard.props';
import CartList from '../../components/CartList/CartList';
import { CartDeviceCardProps } from '../../components/CartCard/CartDeviceCard.props';

export default function Cart(){

    const cartArr = useSelector((s:RootState) => s.cart.cartDevices)
    const [cartDevices, setCartDevices] = useState<CartDeviceCardProps[]>([])

    const calculator = cartDevices.reduce( (sum, el) => {
        sum.quantity += 1
        sum.price += el.price * el.count

        return sum
    },{quantity: 0, price: 0}) // калькулятор который считает общее количсетво денег и количество девайсов


    useEffect( () => {
        loadAllCartDevices() 
    },[cartArr])

    const getInfoDevice = async (id: number, memory: string, count: number) => {

        const {data} = await axios.get<DeviceCardProps>(PREFIX + '/device/' + id)

        return {
            id: data.id,
            memory: memory,
            count: count,
            name: data.name,
            price: data.memoryPrice.filter( el => el.memory == memory)[0].price,
            image: data.image
        }

       
        
    }

    const loadAllCartDevices = async() => {

        const allCartDevice = await Promise.all(cartArr.map(el => getInfoDevice(el.id, el.memory, el.count)))

        setCartDevices(allCartDevice)
    }

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
            
            <CartList cartDevices={cartDevices}></CartList>

            <div  className={styles['info']}>
                <div className={styles['quantity']}>Всего девайсов <span> {calculator.quantity}&nbsp;шт.</span></div>
                <div className={styles['sum']}>Cумма заказа: <span>{calculator.price}&nbsp;₽</span></div>
            </div>
        </div>
    )
}