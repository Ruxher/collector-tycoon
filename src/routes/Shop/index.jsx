
import { useState } from 'react'
import styles from './Shop.module.css'
import Modal from './Modal'
import { packs } from '../../data/packs'

const Shop = ({ setGameState, gameState }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [winnerLetter, setWinnerLetter] = useState('')

    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

    function openPack(pack) {
        if (gameState.money >= pack.price) {
            const letters = pack.letters_raw
            const letter = letters[Math.floor(Math.random() * letters.length)];
            setWinnerLetter(letter)
            setGameState(prev => ({
                ...prev,
                money: prev.money - pack.price,
                letters: [ ...prev.letters, letter],
            }))
            openModal()
        }
    }

    return (
        <main className={styles.shop}>
            {isModalOpen && (<Modal winnerLetter={winnerLetter} closeModal={closeModal}/>)}
            <div className={styles.pack}>
                <h2>{packs.initial.title}</h2>
                <p>{packs.initial.letters}</p>
                <button onClick={() => openPack(packs.initial)} >{`R$ ${packs.initial.price}`}</button>
            </div>
            <div className={styles.pack}>
                <h2>{packs.comum.title}</h2>
                <p>{packs.comum.letters}</p>
                <button onClick={() => openPack(packs.comum)} >{`R$ ${packs.comum.price}`}</button>
            </div>
            <div className={styles.pack}>
                <h2>{packs.advanced.title}</h2>
                <p>{packs.advanced.letters}</p>
                <button onClick={() => openPack(packs.advanced)} >{`R$ ${packs.advanced.price}`}</button>
            </div>
            <div className={styles.pack}>
                <h2>{packs.epic.title}</h2>
                <p>{packs.epic.letters}</p>
                <button onClick={() => openPack(packs.epic)} >{`R$ ${packs.epic.price}`}</button>
            </div>

        </main>
    )
}

export default Shop
