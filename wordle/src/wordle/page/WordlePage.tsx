import { useEffect } from "react"
import { handleKeyPress, loadRandomWord } from "../proxy/wordle"
import "./wordlepage.css"
import Board from "../components/board/Board"
import { KEY_MAP } from "../constants"
import Keyboard from "../components/keyboard/Keyboard"


const WordlePage = () => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (KEY_MAP[e.code as keyof typeof KEY_MAP]) {
                handleKeyPress(e.code as keyof typeof KEY_MAP)
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        loadRandomWord()
    }, [])

    return (
        <div className="page">
            <Board />
            <Keyboard />
        </div>
    )
}

export default WordlePage