const SAVE_KEY = 'collector_tycoon'

export const saveGame = (data) => {
    const dataString = JSON.stringify(data)
    localStorage.setItem(SAVE_KEY, dataString);
}

export const loadGame = () => {
    const saved = localStorage.getItem(SAVE_KEY)
    return saved ? JSON.parse(saved) : null
}