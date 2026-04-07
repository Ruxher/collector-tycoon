
import { Link } from 'react-router-dom'
import styles from './Header.module.css'

const Header = ({ money }) => {
    return (
        <header>
            <Link className={styles.link} to="/collections">Coleções</Link>
            <Link className={styles.link} to="/">Inicio</Link>
            <h1 className={styles.money}>{`R$ ${money}`}</h1>
            <Link className={styles.link} to="/shop">Loja</Link>
            <Link className={styles.link} to="/inventory">Inventorio</Link>
        </header>
    )
}

export default Header

