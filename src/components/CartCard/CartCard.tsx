import styles from './CartCard.module.css';
import minusIMG from '../../../public/cart/minus.svg'
import plusIMG from '../../../public/cart/plus.svg'
import deleteIMG from '../../../public/cart/delete.svg'

export default function CartCard(){



    return(
        <div>
             <hr className={styles['line']}/>

            <div className={styles['cart']}>

            <div style={{}} className={styles['img']}></div>


            <div className={styles['container']} >
                <div className={styles['name']}></div>
                <div className={styles['memory']}></div>
            </div>

            <div className={styles['action']}>
                <img src={minusIMG} alt="" />
                <div className={styles['count']}>{2}</div>
                <img src={plusIMG} alt="" />
            </div>

            <div className={styles['price']}>{}</div>

            <img src={deleteIMG} alt="" />
        </div>
        </div>
    )
}