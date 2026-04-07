
import styles from './Home.module.css'
import Earn from "../../components/Earn"

const Home = ({ setGameState }) => {
    return (
        <main>
            <Earn setGameState={setGameState} />
        </main>
    )
}

export default Home