
import styles from './Collections.module.css'
import { collections } from '../../data/collections'
import { useEffect, useState } from 'react'
import { FaTrash as Trash } from "react-icons/fa";
import { FaCheck as Check } from "react-icons/fa";

const Collections = ({ gameState, setGameState, setPassiveRent }) => {
    const [inputValue, setInputValue] = useState('')
    const [lettersInInventoryCopy, setLettersInInventoryCopy] = useState(gameState.letters)

    const handleInput = (e) => {
        // verifica se tem no inventario
        if (lettersInInventoryCopy.includes(e.key.toUpperCase())) {
            // procura indice da letra
            const letterIndex = lettersInInventoryCopy.findIndex((letter) => letter === e.key.toUpperCase())
            // remove letra no indice 
            setLettersInInventoryCopy(prev => prev.filter((letter, i) => i !== letterIndex))
            setInputValue(prev => prev + e.key)
        }
    }

    const delet = () => {
        setInputValue('')
        setLettersInInventoryCopy(gameState.letters)
        const collectionsWords = collections.map((collection) => { return collection.words })
    }

const confirm = () => {
    if (inputValue === '') {
        alert('coloque uma palavra')
        return
    }
    
    const word = inputValue.toUpperCase()
    
    if (!collections.some((collection) => Object.keys(collection.words).includes(word))) {
        alert('palavra não encontrada')
        return
    }

    const baseCollection = collections.find((collection) =>
        Object.keys(collection.words).includes(word)
    )

    setGameState(prev => {
        const alreadyExists = prev.collections.some((col) => col.id === baseCollection.id)
        
        const updatedCollections = alreadyExists
            ? prev.collections.map((col) =>
                col.id === baseCollection.id
                    ? { ...col, words: { ...col.words, [word]: true } }
                    : col
            )
            : [...prev.collections, { ...baseCollection, claimed: false, words: { ...baseCollection.words, [word]: true } }]

        return {
            ...prev,
            letters: lettersInInventoryCopy,
            collections: updatedCollections
        }
    })

    setInputValue('')
}

    const checkCollection = () => {
        const completedCollections = gameState.collections.filter((collection) => Object.values(collection.words).every((word) => word !== false))

        if (completedCollections.length > 0) {
            completedCollections.map((collection) => {
                if (!collection.claimed) {
                    setGameState(prev => ({
                        ...prev,
                        collections: prev.collections.map((col) => 
                            col.id === collection.id ? { ...col, claimed: true} : col
                        )
                    }))
                } 
            })
        }
    }
    return (
        <main className={collections}>
            <div className={styles.letterInput}>
                <h1>Tente uma palavra:</h1>
                <div className={styles.input}>
                    <button onClick={delet} className={styles.button}>
                        <Trash className={styles.icon} />
                    </button>
                    <input
                        onKeyDown={handleInput}
                        value={inputValue}
                    />
                    <button onClick={confirm} className={styles.button} >
                        <Check className={styles.icon} />
                    </button>
                </div>
            </div>
            <div className={styles.container}>
                {collections.map((collection) => {
                    const savedCollection = gameState.collections.find((col) => col.id === collection.id)
                    const collectionToRender = savedCollection || collection
                    return (
                        <div className={styles.collection}>
                            <h2>{collectionToRender.name}</h2>
                            <div>
                                {Object.keys(collectionToRender.words).map((word) => <p className={collectionToRender.words[word] ? styles.activedWord : styles.desactivedWord} >{word}</p>)}
                            </div>
                            <button onClick={checkCollection}>{`+R$${collectionToRender.reward}/seg`}</button>
                        </div>
                    )
                })}
            </div>
        </main>
    )
}

export default Collections