import { GameState, useWordle } from "../../proxy/wordle"
import "./badge.css"

const Badge = () => {
    const { gameState, word } = useWordle()

    if (gameState !== GameState.LOST) {
        return null
    }

    return (
        <div className="badge">
            {word?.toUpperCase()}
        </div>
    )
}

export default Badge