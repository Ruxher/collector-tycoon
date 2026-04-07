
import { collections } from '../../data/collections'
import styles from './Earn.module.css'

const Earn = ({ setGameState }) => {

    function earnMoney() {
        setGameState(prev => ({
            ...prev,
            money: prev.money + 1, 
        }))
    }

    return (
        <div className={styles.earn} >
            <button onClick={earnMoney}>Lucrar</button>
        </div>
    )
}

export default Earn