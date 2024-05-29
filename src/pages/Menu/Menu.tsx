import { useContext, useEffect, useState } from 'react';
import MenuList from '../../components/MenuList/MenuList';
import Category from '../../components/Category/Category';
import { DeviceCardProps } from '../../components/DeviceCard/DeviceCard.props';
import styles from './Menu.module.css';
import axios, { AxiosError } from 'axios';
import PREFIX from '../../helper/PREFIX';

import Search from '../../components/Search/Search';
import { AxiosProps } from './Axios.props';
import { PaginationContext } from '../../layout/Show/Show';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';


export default function Menu(){

    const {currentPage, setMetaDevice} = useContext(PaginationContext) // // контекст содержащий данные о страницах и переход на страницу


    
    const {...categorySlice} = useSelector( (s:RootState) => s.category) // слайс для отображения выбрапнной категории
    
    const [isLoading, setIsLoading] = useState<boolean>() // значение для отображния предзагрузки
    const [dataDevice, setDataDevice] = useState<DeviceCardProps[]>([]) // список девайсов
 
    const [searchValue, setSearchValue] = useState<string | undefined>('') // данные для поиска из инпута


    useEffect( () => {

      getMenu()
    }, [categorySlice.id, currentPage,searchValue])

    const getMenu = async()=>{

        const category = categorySlice.id > 0 ? `idDevice=${categorySlice.id}` : ''
        const search = searchValue ? `title=${searchValue}` : ""

          try {
            setIsLoading(true)
            const {data} = await axios.get<AxiosProps, any>(PREFIX + `/device?${search}&page=${currentPage}&limit=6&${category}`) 
            
            setDataDevice(data.items)
            setMetaDevice(data.meta)
        
            await setTimeout( () => setIsLoading(false), 1000)
        } catch (e) {
            
            if(e instanceof AxiosError){
                console.log("произошла ошика при получении данных: " + e.message)
                
            }
        }
    }
    

    return(
        <div className={styles['menu']}>
            <div className={styles.action}>
                 <Category ></Category> 
                 <Search setSearchValue={setSearchValue} searchValue={searchValue} />
            </div>
           

            <div className={styles['title']} >{categorySlice.title[categorySlice.id]}</div>

            { !isLoading && <MenuList dataDevice={dataDevice}></MenuList>}
            { isLoading && <div className={styles['loading']}> Загружаем девайсы для ваших прекрасных глаз ...</div>}
            {/* { isLoading && <div className={styles['skeleton']}> {Array(6).fill(0).map( (el, i) => <DeviceSkeleton key={i+el}></DeviceSkeleton>)} </div>} */}
        </div>
    )
}