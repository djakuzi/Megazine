import DeviceCard from '../DeviceCard/DeviceCard';
import styles from './MenuList.module.css';
import { MenuListProps } from './MenuList.props';

export default function MenuList({dataDevice}: MenuListProps ){


    return(
        <div className={styles['menuList']}>
            {dataDevice.map( el => <DeviceCard key={el.id} {...el}></DeviceCard>)}
        </div>
    )
}

// если выбран sort 0, то бцдет показывать все девайсы 
// сортировка девайсов по категориям идет с 1, то есть айфоны это 1, мабуки, это два и так далее
// при получнии данных о девайсах есть специальное свойват idDevice, которое нужно для сортировки по критериям