import { Link, NavLink, Outlet, useLocation} from 'react-router-dom';
import styles from './Show.module.css';
import cartIMG from '../../../public/show/cart.svg'
import logoIMG from '../../../public/show/logo.png'
import profileIMG from '../../../public/show/profile.svg'
import cn from 'classnames';
import { createContext, Suspense, useEffect, useState } from 'react';
import { Meta } from '../../pages/Menu/Meta.prop';
import Pagination from '../../components/Pagination/Pagination';
import { PaginationContextProps} from './PaginationContext.props';
import axios from 'axios';
import { useSelector} from 'react-redux';

import { DeviceCardProps } from '../../components/DeviceCard/DeviceCard.props';
import PREFIX from '../../helper/PREFIX';
import { RootState} from '../../redux/store';

const startContext = {
    currentPage: 0,
    setMetaDevice: () => {}
}
export const PaginationContext = createContext<PaginationContextProps>(startContext) // контекст содержащий данные о страницах и переход на страницу

export default function Show(){

    
     const [metaDevice, setMetaDevice] = useState<Meta | undefined>() // данные о страницах
     const [currentPage, setCurrentPage] = useState<number>(0) // страница  списка девайсв на которую нужно перейти

     const obgPaginate = {
        currentPage,
        setMetaDevice
     }

     const location = useLocation().pathname == '/Megazine/show/menu'


    //  решение не самое лучшее, потому что стоило бы сделать все через redux

    const cartArr = useSelector((s:RootState) => s.cart.cartDevices)    
    const [cartDevices, setCartDevices] = useState<{memory: string, price: number, count: number}[]>([])
    // const idUser = useSelector((s:RootState) => s.user.profile?.id)

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
        // console.log(data)
        data
        return {
            memory: memory,
            count: count,
            price: data.memoryPrice.filter( el => el.memory == memory)[0].price,
        }
        
    }

    const loadAllCartDevices = async() => {

        const allCartDevice = await Promise.all(cartArr.map(el => getInfoDevice(el.id, el.memory, el.count)))

        setCartDevices(allCartDevice)
    }

    return (
        <div className={styles.wrapper}>
            <PaginationContext.Provider value={obgPaginate}>

                <div className={styles['show']}>

                    <div className={styles['header']}>
                        
                        <Link className={styles["header__link"]} to={'/Megazine/show/menu'}>

                            <div className={styles['logo']}>
                                <img  src={logoIMG} alt="лого" />
                            </div>

                            <div className={styles['box-txt']}>
                                <div className={styles['name']}>DEVICE TOP</div>
                                <div className={styles['title']}>девайсы для твоей души</div>
                            </div>

                        </Link>


                        <NavLink className={ ({isActive}) => cn(styles['profile-icon'],{
                                [styles.active]: isActive,
                            })} to="/Megazine/show/profile">
                            <img src={profileIMG} alt="" />
                        </NavLink>

                         <NavLink className={ ({isActive}) => cn(styles['cart__link'],{
                                [styles.active]: isActive,
                            })} to="/Megazine/show/cart">

                            <div className={styles['price']}>{calculator.price}₽</div>
                            <div className={styles['line']}></div>
                            <div className={styles['box-items']}>
                                <img src={cartIMG} alt="иконка корзины" />
                                <div className={styles['q']}>{calculator.quantity}</div>
                            </div>
                        </NavLink>
                    </div>

                    <div className={styles['content']}>
                    <Suspense fallback={<>Загрузка...</>}>
                        <Outlet />
                    </Suspense>
                        
                    </div>
                </div>
                
                { location && <Pagination setCurrentPage={ (num) => setCurrentPage(num)} metaDevice={metaDevice}></Pagination>}

            </PaginationContext.Provider>
            

        </div>
        
    )
}