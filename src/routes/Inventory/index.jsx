
import styles from './Inventory.module.css'

const Inventory = ({ gameState }) => {

    const reduceLetters = gameState.letters.reduce((count, letter) => {
        count[letter] = (count[letter] || 0) + 1
        return count
    }, {})

    return (
        <main className={styles.inventory}>
            {Object.entries(reduceLetters).map(([key, value]) => {
                return (
                    <div className={styles.item}>
                        <h2>{key}</h2>
                        <p>{value}</p>
                    </div>
                )
            })}
        </main>
    )
}

export default Inventory