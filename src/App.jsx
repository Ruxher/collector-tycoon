import { useEffect, useState } from "react"
import Header from "./components/Header"
import { loadGame, saveGame } from "./utils/storage"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./routes/Home"
import Shop from "./routes/Shop"
import Inventory from "./routes/Inventory"
import Collections from "./routes/Collections"
import { collections } from "./data/collections"

function App() {
  const [passiveRent, setPassiveRent] = useState(0)
  const [gameState, setGameState] = useState(() => {
    const saved = loadGame();
    return saved || {
      money: 0,
      letters: [],
      collections: []
    }
  }
  )

  console.log(gameState)
  useEffect(() => {
    saveGame(gameState)
  }, [gameState])

  useEffect(() => {
    const total = gameState.collections
      .filter(col => col.claimed)
      .reduce((acc, col) => acc + col.reward, 0)
    console.log(gameState.collections)
    setPassiveRent(total)
  }, [gameState.collections])

  useEffect(() => {
    const interval = setInterval(() => {
      setGameState(prev => ({
        ...prev,
        money: prev.money + passiveRent,
      }))
    }, 1000)

    return () => clearInterval(interval)
  }, [passiveRent])


  return (
    <BrowserRouter>
      <Header money={gameState.money} />
      <Routes>
        <Route path="/" element={<Home
          setGameState={setGameState}
        />} />
        <Route path="/shop" element={<Shop
          gameState={gameState}
          setGameState={setGameState}
        />} />
        <Route path="/inventory" element={<Inventory
          gameState={gameState}
        />} />
        <Route path="/collections" element={<Collections
          gameState={gameState}
          setGameState={setGameState}
          setPassiveRent={setPassiveRent}
        />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
