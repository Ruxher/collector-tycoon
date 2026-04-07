
import styles from './Modal.module.css'

const Modal = ({ winnerLetter, closeModal }) => {


    return (
        <div className={styles.modal}>
            <div className={styles.dialog}>
                <h1>Você ganhou:</h1>
                <h2>{`"${winnerLetter}"`}</h2>
                <button onClick={closeModal}>Pegue</button>
            </div>
        </div>
    )
}

export default Modal