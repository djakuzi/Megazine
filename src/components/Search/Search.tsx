
import styles from './Search.module.css'
import searchIMG from '../../.././public/menu/search.svg'
import clearIMG from '../../.././public/menu/clear.svg'
import { SearchProps } from './Search.props'


export default function Search({searchValue, setSearchValue}:SearchProps){

    return (
        <div className={styles['input-wrapper']}>
              <input value={searchValue} onChange={(e) => {setSearchValue(e.target.value)}} className={styles['input']} type="text" placeholder="поиск"/>
              <img className={styles.search} src={searchIMG} alt="иконка поиска" />
              {searchValue &&  <img  className={styles.clear}  onClick={ ()=> setSearchValue('')} src={clearIMG} alt="очистить ввод" />}
        </div>
      
    )
}