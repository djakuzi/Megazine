import { Link, NavLink, Outlet } from 'react-router-dom';
import styles from './Show.module.css';
import cartIMG from '../../../public/show/cart.svg'
import logoIMG from '../../../public/show/logo.png'
import cn from 'classnames';
import { createContext, Suspense, useState } from 'react';
import { Meta } from '../../pages/Menu/Meta.prop';
import Pagination from '../../components/Pagination/Pagination';
import { PaginationContextProps} from './PaginationContext.props';

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

    return (
        <div className={styles.wrapper}>
            <PaginationContext.Provider value={obgPaginate}>

                <div className={styles['show']}>

                    <div className={styles['header']}>
                        
                        <Link className={styles["header__link"]} to={'/megazine/show/menu'}>

                            <div className={styles['logo']}>
                                <img  src={logoIMG} alt="лого" />
                            </div>

                            <div className={styles['box-txt']}>
                                <div className={styles['name']}>DEVICE TOP</div>
                                <div className={styles['title']}>девайсы для твоей души</div>
                            </div>

                        </Link>

                    <NavLink className={ ({isActive}) => cn(styles['cart__link'],{
                            [styles.active]: isActive,
                        })} to="/megazine/show/cart">

                            <div className={styles['price']}>520 ₽</div>
                            <div className={styles['line']}></div>
                            <div className={styles['box-items']}>
                                <img src={cartIMG} alt="иконка корзины" />
                                <div className={styles['q']}>0</div>
                            </div>
                        </NavLink>
                    </div>

                    <div className={styles['content']}>
                    <Suspense fallback={<>Загрузка...</>}>
                        <Outlet />
                    </Suspense>
                        
                    </div>
                </div>
                
                <Pagination setCurrentPage={ (num) => setCurrentPage(num)} metaDevice={metaDevice}></Pagination>

            </PaginationContext.Provider>
            

        </div>
        
    )
}