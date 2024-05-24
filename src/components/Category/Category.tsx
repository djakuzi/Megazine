import styles from './Category.module.css';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { categoryActions } from '../../redux/slices/category.slice';


export default function Category(){

    const dispatch = useDispatch<AppDispatch>()
    const {...categorySlice} = useSelector( (s:RootState) => s.category)

    return (
        <div className={styles['category']}>

            {categorySlice.title.map( (el, i) => {
                return <li onClick={() => dispatch(categoryActions.changeCategory(i))} key={i} className={ cn(styles['li'], {
                    [styles.active]: i == categorySlice.id
                })} >{el}</li>
            })}
        </div>
    )
}


// dispatch({id: i, title: el})