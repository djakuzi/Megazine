import styles from './Cart.module.css';
import cartIMG from '../../../public/cart/cart.svg'
import clearIMG from '../../../public/cart/clear.svg'
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import axios from 'axios';
import PREFIX from '../../helper/PREFIX';
import { useEffect, useState } from 'react';
import { DeviceCardProps } from '../../components/DeviceCard/DeviceCard.props';
import CartList from '../../components/CartList/CartList';
import { CartDeviceCardProps } from '../../components/CartCard/CartDeviceCard.props';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../redux/slices/cart.slice';
import {  useNavigate } from 'react-router-dom';
import { axiosSendOrders } from '../../redux/slices/user.slice';

export default function Cart(){

    const cartArr = useSelector((s:RootState) => s.cart.cartDevices)
    const [cartDevices, setCartDevices] = useState<CartDeviceCardProps[]>([])
    const idUser = useSelector((s:RootState) => s.user.profile?.id)

    const [ready, setReady] = useState<boolean>(false)
    // const idUser = useSelector((s:RootState) => s.user.profile?.id)
    const navigate = useNavigate()
    

    const dispatch = useDispatch<AppDispatch>()

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
        data
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

    const clickPay = async() => {

        function randomInteger(min:number, max: number): number {
            // случайное число от min до (max+1)
            let rand = min + Math.random() * (max + 1 - min);
            let randtwo = min + Math.random() * (max + 1 - min);
            return Math.floor(rand) + Math.floor(randtwo);
        }

        const randomIdOrder: number = randomInteger(1000, 20000)

        dispatch(axiosSendOrders({
            idUser: idUser as number,
            idOrder: randomIdOrder,
            date: new Date().toLocaleDateString(),
            order: cartDevices,
            calculator: {
                ...calculator
            }
        }))

        

        dispatch(cartActions.clear())
        setReady(true)
        

    }

    return(
        <div className={styles['cart']}>
            <div className={styles['header']}>

                <img src={cartIMG} alt="" />
                <div className={styles['title']}> Корзина</div>
                <div className={styles['container']}>
                    <img src={clearIMG} alt="" />
                    <div className={styles['clear']} onClick={()=> dispatch(cartActions.clear())}>очистить корзину</div>
                </div>
            </div>

            {ready && <div className={styles['ready']}>Заказ оформлен &#128525;</div>}
            
            <CartList cartDevices={cartDevices}></CartList>

            <div className={styles['info']}>
                <div className={styles['quantity']}>Всего девайсов <span> {calculator.quantity}&nbsp;шт.</span></div>
                <div className={styles['sum']}>Cумма заказа: <span>{calculator.price}&nbsp;₽</span></div>
            </div>


            <div className={styles.doing}>
                <div className={styles.back} onClick={()=> navigate('/Megazine/show/menu')}>Назад</div>
                <button className={styles.pay} disabled={calculator.price == 0} onClick={()=> clickPay()}> Заказать</button>
            </div>
        </div>
    )
}